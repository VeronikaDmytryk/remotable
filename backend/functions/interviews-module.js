let mongo = require('mongodb');
let mongoUtil = require("./mongo-dao");


module.exports = {
    getInterviews: function (callback) {
        db = mongoUtil.getDb();
        db.collection("interviews").find({}).toArray(function (error, interviews) {
            callback(interviews);
            console.log("get interviews");
        });
    },

    updateInterview: function (interview, callback) {
        db = mongoUtil.getDb();
        let id = new mongo.ObjectId(interview._id);
        delete interview._id;
        db.collection("interviews").updateOne({ _id: id }, { $set: interview}, function (error, interview) {
                callback();
                console.log("add or update interview");
        });
    },

    addInterview: function (interview, callback) {
        db = mongoUtil.getDb();
        db.collection("interviews").insertOne(interview, function (error, interview) {
                var _id = interview._id;
                callback(_id);
                console.log("add or update interview");
        });
    },

    deleteInterview: function (id, callback) {
        db = mongoUtil.getDb();
        let delId = new mongo.ObjectId(id);
        db.collection("interviews").deleteOne({ _id: delId }, function (error, interviews) {
            callback();
            console.log("delete interview");
        });
    },

    // getTaskGroupsByUsername: function (username, callback) {
    //     mongo.MongoClient.connect(url, function (error, db) {
    //         if (error)
    //             throw error;
    //         db.collection("taskGroups").find({ user: username }).toArray(function (error, groups) {
    //             db.close();
    //             callback(groups);
    //         });
    //     });
    // }
}