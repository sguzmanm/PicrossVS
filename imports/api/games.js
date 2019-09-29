import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";

// Boards collections and topics
import { Boards } from "../api/boards";

// Game topics
import { activeGamesTopic,gamesTopic } from "../util/topics";

// Game states
import {WAITING,ACTIVE,CANCELLED} from "../util/gameStates";

// DB Access
export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(activeGamesTopic, function linksPublication() {
    return Games.find({state:WAITING});
  });

  Meteor.publish(gamesTopic, function linksPublication() {
    return Games.find({});
  });
}

function findBoard(size)
{
  let data=Boards.find({}).fetch();
  console.log("DATA",data);
  let boards=Boards.find({ rows: { $size: size } }).fetch();
  return boards[Math.floor(Math.random()*boards.length)];
}

Meteor.methods({
  "games.insert"(size,numWaitedUsers){
    if(size!==5 && size !== 10 && size !== 20)
      throw new Meteor.Error("Board size does not match");
    if(numWaitedUsers<1 || numWaitedUsers>4)
      throw new Meteor.Error("Num of users is not specified");
    if(!this.userId)
      throw new Meteor.Error("Not authorized");
    let board=findBoard(size);
    console.log("Random board",board);
    let game={
      state:numWaitedUsers===1?1:0,
      numWaitedUsers:numWaitedUsers,
      players:[
        {
          user:Meteor.user(),
          board:board
        }
      ],
      createdAt:new Date(),
    };
    return Games.insert(game);
  },
  "games.update"(id,playerIndex,board,score){
    // Get user and game
    let user=Meteor.user();
    let game=Games.find({_id:id}).fetch()[0];
    // Make validations
    if(!game)
      throw new Meteor.Error(`There is no game with id ${id}`);

    let currentPlayer=game.players[playerIndex];

    console.log("Indexes",playerIndex,currentPlayer.user._id,user._id);
    if (currentPlayer.user._id!==user._id)
      throw new Meteor.Error(`${user.username} is not part of the game`);

    currentPlayer.board.curCells=board;
    currentPlayer.curScore=score;

    console.log("PLAYER",currentPlayer);

    Games.update(id,{$set:game});
  },
  "games.addUser"(id){
    // Get user and game
    let user=Meteor.user();
    let game=Games.find({_id:id}).fetch()[0];
    // Make validations
    if(!game)
      throw new Meteor.Error(`There is no game with id ${id}`);
    if(game.players.some(el=>el.user._id===user._id))
      throw new Meteor.Error(`${user.username} is already part of the game`);
    // Add user
    
    let board=game.players[0].board;
    board.curCells=[];

    let rows=board.rows.length;
    let cols=board.columns.length;
    for(let i=0;i<rows;i++)
    {
      board.curCells.push(new Array(cols).fill(0));
    }

    game.players.push({
      user:user,
      board:board,
      curScore:0
    });

    // Start game if everything is setup
    if(game.players.length===game.numWaitedUsers)
    {
      game.state=ACTIVE;
      // TODO: Implement timeout for finishing the game on the server
    }

    Games.update(id,{$set:game});
  },
  "games.removeUser"(id){
    // Get user and game
    let user=Meteor.user();
    let game=Games.find({_id:id}).fetch()[0];
    // Make validations
    if(!game)
      throw new Meteor.Error(`There is no game with id ${id}`);
    let playerIndex=game.players.findIndex(el=>el.user._id===user._id);
    if(playerIndex===-1)
      throw new Meteor.Error(`${user.username} is not part of the game`);
    // Remove player
    game.players.splice(playerIndex,1);

    // Validate if the user is the owner of the game
    if(game.players.length===0)
      game.state=CANCELLED;

    Games.update(id,{$set:game});
  }
});