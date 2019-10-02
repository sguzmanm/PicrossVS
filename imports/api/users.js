import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

//TOPICS FOR USERS
import { usersTopic } from "../util/topics";

export const Users = Meteor.users;

if (Meteor.isServer) {
    Meteor.publish(usersTopic, function linksPublication() {
        return Users.find({}, { sort: { score: -1 } });
    });
}