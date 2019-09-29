import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";


// Game topics
import { gamesTopic } from "../util/topics";

// Game states
import {ACTIVE,CANCELLED,FINISHED} from "../util/gameStates";

// DB Access
export const Games = new Mongo.Collection("games");

// Other collections
import { Boards } from "../api/boards";
import { Users } from "../api/users";


if (Meteor.isServer) {
  Meteor.publish(gamesTopic, function linksPublication() {
    return Games.find({});
  });
}

function findBoard(size)
{
  let boards=Boards.find({ rows: { $size: size } }).fetch();
  return boards[Math.floor(Math.random()*boards.length)];
}

function addScoreToUser(score)
{
  if(score<0)
    score=0;
    
  let user=Meteor.user();
  if(!user.score)
    user.score=0;

  user.score+=score;
      
  return Users.update(user._id,{$set:user});
}

function setupCurCells(rows,cols)
{
  let curCells=[];

  for(let i=0;i<rows;i++)
  {
    curCells.push(new Array(cols).fill(0));
  }

  return curCells;
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
    if(!board)
      return;

    board.curCells=setupCurCells(board.rows.length,board.columns.length);

    let game={
      state:numWaitedUsers===1?1:0,
      numWaitedUsers:numWaitedUsers,
      numFinished:0,
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

    if (currentPlayer.user._id!==user._id)
      throw new Meteor.Error(`${user.username} is not part of the game`);

    currentPlayer.board.curCells=board;
    currentPlayer.curScore=score;

    Games.update(id,{$set:game});
  },
  "games.finish"(id,playerIndex,isDropout){
    // Get user and game
    let user=Meteor.user();
    let game=Games.find({_id:id}).fetch()[0];

    // Make validations
    if(!game)
      throw new Meteor.Error(`There is no game with id ${id}`);

    let currentPlayer=game.players[playerIndex];
    if (currentPlayer.user._id!==user._id)
      throw new Meteor.Error(`${user.username} is not part of the game`);

    // Setup finished states
    game.numFinished++;
    if(game.numFinished===game.numWaitedUsers)
    {
      game.state=FINISHED;
    }

    let bonus=isDropout?-2000:500-(game.numFinished*100);
    currentPlayer.curScore+=bonus;
    currentPlayer.finished=true;

    Games.update(id,{$set:game});

    addScoreToUser(currentPlayer.curScore);
  },
  "games.addUser"(id){
    // Get user and game
    let user=Meteor.user();
    let game=Games.find({_id:id}).fetch()[0];
    // Make validations
    if(!game)
      throw new Meteor.Error(`There is no game with id ${id}`);
    if(game.players.some(el=>el.user._id===user._id))
      return;
    // Add user
    
    let board=game.players[0].board;
    board.curCells=setupCurCells(board.rows.length,board.columns.length);

    game.players.push({
      user:user,
      board:board,
      curScore:0,
      finished:false
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