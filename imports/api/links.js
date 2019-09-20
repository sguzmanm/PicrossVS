import { Mongo } from 'meteor/mongo';
import { linksTopic } from '../util/topics'

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    console.log("LOG")
    // This code only runs on the server
    Meteor.publish(linksTopic, function linksPublication() {
      return Links.find();
    });
  }