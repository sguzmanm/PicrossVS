import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Boards collections and topics
import { Boards } from "../api/boards";

// Game topics
import { activeGamesTopic } from '../util/topics';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish(activeGamesTopic, function linksPublication() {
      return Games.find({state:0});
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
    'games.insert'(size,numWaitedUsers){

        console.log(size,numWaitedUsers);

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
        }
        Games.insert(game)
    }
})