# PicrossVS

Competitive multiplayer version of the fun mind-daunting game Picross. Challenge your friends by selecting your board of preference in an exciting real time web experience

## Colaborators

- Carlos Mario Sarmiento: Alias "El Korkies"

  [Personal Site](https://korkies22.github.io/Portfolio/) - [GitHub](https://github.com/korkies22/)

- Sergio Guzmán Mayorga: Alias "El Checho"

  [Personal Site](https://sguzmanm.github.io/i-am-sergio-guzman/) - [GitHub](https://github.com/sguzmanm)

## Links

**Deployed at: https://picross-vs.herokuapp.com/**

## Description

PicrossVS allows people to challenge random players in a competitive battle to solve a Picross Board. Boards can be selected in sizes of 5x5,10x10,15x15 and 20x20 tiles per board. Also, people can choose to create a game for 1 up to 4 people at the same time. Each people gain points while they complete the board. But be careful, one mistake and you will lose points. There are extra points accounting for order of completion. If someone leaves a match, they will be penalized with a lot of points!

## Objective

We want to allow people to play picross (commonly known as nonograms) with their friends for the sake of spending time and having fun

## Tecnologies used

This project was developed using:

- **Mongo DB**: MongoDB was used as a NOSQL database. Here users,boards and games are stored.
- **Meteor**: A web app framework for JS for real-time databases and interactions between clients. https://www.meteor.com/
- **React JS**: A Front End library useful for creating components. https://reactjs.org/
- **Node JS**: A javascript environment which allows to create a web server with javascript. https://nodejs.org


## Instructions to execute
### Requisites


- Install nodejs **https://nodejs.org/**
- Install meteor **https://www.meteor.com/install**
- Install Heroku CLI(Optional, for replicating our deployment only) **https://devcenter.heroku.com/articles/heroku-cli**

Clone this project
```
git clone https://github.com/sguzmanm/PicrossVS/
```
Install dependencies
```
cd PicrossVS
```
```
meteor npm install
```
Create a .env file in the main folder with the variable MONGO_URL pointing to a mongoDB hosting page of your preference.
Run project
```
npm run dev
```

Verify that nodejs is installed by running "node -v" on terminal or cmd. It can be downloaded in https://nodejs.org/ (versión LTS)

### Steps to deploy production version into Heroku

It is assumed that the Heroku CLI is setup in your computer for this and connected to a project. If you are not sure or do not have this, please visit https://devcenter.heroku.com/articles/getting-started-with-nodejs.

Setup env vars in heroku of the.env file, by [dashboard](https://dashboard.heroku.com/) or CLI with:

```
heroku config:set <KEY>=<value>
```
Set the environamental variable of ROOT_URL to the url with the heroku page deployed and MONGO_URL with the url of your MongoDB instance
## Screenshots

### Main Menu

_-- NEED TO CHECK AFTER DEV_
![Picross VS SS](./readme/ss.PNG)

## License

This project is public under the MIT license, found [here](https://github.com/sguzmanm/PicrossVS/blob/master/LICENSE)

# Others

## Backup json files

- Meanwhile we get the DB to work hahaha we have backup json files in imports/api/db_upload that can be added to mongo by running the following commands:

```
mongoimport -h localhost:3001 -d meteor -c games --file games.json --jsonArray
```

```
mongoimport -h localhost:3001 -d meteor -c boards --file boards.json --jsonArray
```

For prod DB:

```
mongoimport --uri "mongodb+srv://picrossVS:<Password url encoded>@picrossvs-xa3gu.mongodb.net/meteor" -c boards --type json --file boards.json --jsonArray
```

## Libs

- dotenv: Env vars

## Meteor packages

- fourseven:scss
