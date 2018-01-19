import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Response } from '@angular/http/src/static_response';
import {environment} from "../../../environments/environment";

export class Interview {
    _id: string;
    id: number;
    status: string;
    candidate: string;
    positionNumber: number;
    positionName: string;
    interviewType: string;
    interviewMode: string;
    date: Date;
    interviewer: string;
    score: any;
    creator: string;
}


@Injectable()
export class InterviewsService {
    interviews: Array<Interview>;
    numberOfInterviews: number;
    private interviewsUrl = environment.baseUrl + '/remotable/interviews';

    constructor(private http: Http) {
    }

    getInterviews() {
        return this.http.get(this.interviewsUrl).map(response => {
            return response.json();
        });
    }

    addInterview(interview: Interview){
        let interviewToAdd = JSON.stringify(interview);
        return this.http.put(this.interviewsUrl, interviewToAdd, null);
    };

    updateInterview(interview: Interview){
        let interviewToUpdate = JSON.stringify(interview);
        this.http.post(this.interviewsUrl, interviewToUpdate, null).subscribe();
    }

    deleteInterview(interviewId: any){
        let url = this.interviewsUrl + "/" + interviewId;
        this.http.delete(url, null).subscribe(); 
    };

    getAvaregeScore(interviews: Array<Interview>){
        let sumOfScores = 0;
        let numberOfCandidatesWithScore = 0;
        for (let interview of interviews){
            if(interview.score != ""){
              sumOfScores += interview.score;  
              numberOfCandidatesWithScore++;
            }
        }
        return (sumOfScores/numberOfCandidatesWithScore).toFixed(1);
    }

    getNumberOfInterviews() {
        return this.http.get(this.interviewsUrl).map(response => {
            this.interviews = response.json();
            let result: number = 0;
            for (let candidate of this.interviews) {
                result++;
            }
            this.numberOfInterviews = result;
            return this.numberOfInterviews;
        });
    }



}