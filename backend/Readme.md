# Interview Manager - (Backend)

[Demo](http://veronikadmytryk.net/projects/remotable/) | @Author: Veronika Dmytryk 

## Getting Started with Backend Part

These instructions will get you an understanding of how to make backend part working and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them
* Install firebase-tools globally
```
npm install -g firebase-tools
```
* Go to the backend folder
```
cd remotable/backend
```
* Init Firebase
```
firebase init functions
```
* Download and install [MongoDB](https://www.mongodb.com/download-center#community)

### Installing

Installing all dependencies be running

```
npm install
```
* Change url to your MongoDB url in data/init-remotable-database.js
* Copy data to your DB, by running
```
node ./data/init-remotable-database.js
```
Adding your MongoDB url
```
 firebase-functions-config:set remotable.dburl = "<YOURDBURL>"
```

Start  the server
```
firebase serve --only functions
```

## Deployment

For deeploying the backend of the project, run
```
firebase deploy --only functions
```
It will deploy the project on Firebase.