import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { activeGamesTopic } from '../util/topics';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish(activeGamesTopic, function linksPublication() {
      return Games.find({ state: 0 });
    });
  }

Meteor.methods({
    'games.insert'(size,numWaitedUsers){
        if(size!==5 || size !== 10 || size !== 20)
            throw new Meteor.Error("Board size does not match");
        if(numWaitedUsers<1 || numWaitedUsers>4)
            throw new Meteor.Error("Num of users is not specified");
        if(!this.userId)
            throw new Meteor.Error("Not authorized");
        let board=[]; // TODO: Select a random board given the size
        let game={
            state:numWaitedUsers===1?1:0,
            numWaitedUsers:1,
            players:[
                Meteor.user()
            ],
            createdAt:new Date(),
        }
        Games.insert(game)
    }
})