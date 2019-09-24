import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import { boardsTopic } from "../util/topics";

export const Boards = new Mongo.Collection("boards");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(boardsTopic, function linksPublication() {
    return Boards.find();
  });
}
