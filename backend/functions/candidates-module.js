let mongo = require('mongodb');
let mongoUtil = require("./mongo-dao");


module.exports = {
    getCandidates: function (callback) {
        db = mongoUtil.getDb();
        db.collection("candidates").find({}).toArray(function (error, candidates) {
            console.log(candidates);
            callback(candidates);
            console.log("get candidates");
        });
    },

    getCandidateById: function (candidateid, callback) {
        db = mongoUtil.getDb();
        let CandidateId = new mongo.ObjectId(candidateid);
        db.collection("candidates").findOne({ _id: CandidateId }, function (err, candidate) {
            callback(candidate);
        });
    }


    // saveCandidates: function (groups, callback) {
    //     let groupsUpdated = 0;
    //     let length = groups.length;
    //     for (let i = 0; i < groups.length; i++) {
    //         let group = groups[i];
    //         db.collection("candidates").updateOne({id: group.id}, group, function (error, groups) {
    //             groupsUpdated++;
    //             if (groupsUpdated === length){
    //                 callback();
    //                 console.log("set candidates");
    //             }
    //         });
    //     } 
    // },
}