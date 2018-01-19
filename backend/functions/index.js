const express = require('express');
const functions = require('firebase-functions');
var admin = require("firebase-admin");
let InterviewsModule = require("./interviews-module");
let CandidatesModule = require("./candidates-module");
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');

app.use(cors());

let mongoUtil = require("./mongo-dao");
mongoUtil.connectToServer(function (err) {

    app.use(bodyParser.json()); // for parsing application/json

    //Candidates requests
    app.get('/candidates', function (req, res) {
        let candidates = [];
        let callback = function (candidates) {
            console.log("List of candidates was requested!");
            let body = JSON.stringify(candidates);
            res.status(200);
            res.send(body);
            res.end();
        }
        CandidatesModule.getCandidates(callback);
    });
    app.get('/candidates/:candidateId', function (req, res) {
        let candidateId = req.params.candidateId;
        
        let callback = function (candidate) {
            console.log("Candidate page was requested");
            let body = JSON.stringify(candidate);
            res.status(200);
            res.send(body);
            res.end();
        }
        candidate = CandidatesModule.getCandidateById(candidateId, callback);
    });

    //Interview requests
    app.get('/interviews', function (req, res) {
        let interviews = [];
        let callback = function (interviews) {
            let body = JSON.stringify(interviews);
            console.log("List of intreviews was requested!");
            res.status(200);
            res.send(body);
            res.end();
        }
        InterviewsModule.getInterviews(callback);
    });

    app.post('/interviews', function (req, res, next) {
        let body = req.body;
        let interview = JSON.parse(body);
        InterviewsModule.updateInterview(interview, function () {
            console.log("One interview was updated!");
            res.status(200);
            res.end();
        });
    });

    app.put('/interviews', function (req, res, next) {
        let body = req.body;
        let interview = JSON.parse(body);
        InterviewsModule.addInterview(interview, function () {
            console.log("New interview was added!");
            res.status(200);
            res.send(JSON.stringify(interview));
            res.end();
        });
    });

    app.delete('/interviews/:interviewId', function (req, res) {
        let interviewId = req.params.interviewId;
        InterviewsModule.deleteInterview(interviewId, function () {
            console.log("One interview was deleted");
            res.status(200);
            res.end();
        });
    });

});

exports.remotable = functions.https.onRequest(app);  