let fs=require('fs');
let mongo = require('mongodb');

// Change it to your MongoDB url
let url = 'mongodb://localhost:27017/remotable';

mongo.MongoClient.connect(url, function(error, db){
    if(error)
        throw error;
    console.log('DB initialization for remotable started...');

    let content_interviews = fs.readFileSync("./interviews.json");
    let interviews = JSON.parse(content_interviews);

    let content_candidates = fs.readFileSync("./candidates.json");
    let candidates = JSON.parse(content_candidates);

    let initInterviews = db.collection("interviews").insertMany(interviews, function(err, result){
        console.log('DB initialization for interviews finished.');
    });
    let initCandidates = db.collection("candidates").insertMany(candidates, function(err, result){
        console.log('DB initialization for candidates finished.');
        
    });

    Promise.all([initCandidates, initInterviews]).then(()=>{
        db.close();
    });
});
