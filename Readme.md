
# Interview Manager - Angular 2

[Demo](http://veronikadmytryk.net/projects/remotable/) | @Author: Veronika Dmytryk 

An interview management system stores data of interviews and candidates in a MongoDB. Users can lookup interviews data, search and filter interviews, see candidates profiles, see reports and customize them by different categories.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* Install Node.js and npm [Node.js homepage](https://nodejs.org/en/)
* Create an account on [Firebase](https://firebase.google.com/)
* Install Angular-cli globally
```
npm install -g @angular/cli
```
 * Clone this repository to your machine
```
git clone https://github.com/VeronikaDmytryk/remotable.git
```
* Go to this folder
```
cd remotable/frontend
```

### Installing

Installing all dependencies be running

```
npm install
```

And then you can start the app by running
```
npm start
```
This will start application on default port `4200`.

## Deployment

For building the frontend of the project

Change urls in src/environments/environment.ts and src/environments/environment.prod.ts to your urls.

then, run
```
ng build --env=prod --base-href /remotable/
```

The instructions how to make the backend work are [here](https://github.com/VeronikaDmytryk/remotable/blob/master/backend/Readme.md)

## Built With

* [Angular 2](https://angular.io/) - Angular 2 framework
* [MongoDB](https://www.mongodb.com/) - MongoDB (no-sql database)
* [Ng2-charts](https://www.npmjs.com/package/ng2-charts) - Charts for Angular 2 based on [Chart.js](http://www.chartjs.org/)
* [Firebase](https://firebase.google.com/) - Firebase

## Authors

* **Veronika Dmytryk** - *Initial work* - [VeronikaDmytryk](https://github.com/VeronikaDmytryk)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details