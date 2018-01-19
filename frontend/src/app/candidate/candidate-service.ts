import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Response } from '@angular/http/src/static_response';
import {environment} from "../../environments/environment";

export class Candidate {
    candidateId: number;
    name: string;
    currentPosition: string;
    experience: Array<any>;
    skills: Array<string>;
    links: any;
    education: any;
}


@Injectable()
export class CandidatesService {
    candidates: Array<Candidate>;
    numberOfCandidates: number;
    private candidatesUrl = environment.baseUrl + '/remotable/candidates';

    constructor(private http: Http) {
    }
    getNumberOfCandidates() {
        return this.http.get(this.candidatesUrl).map(response => {
            this.candidates = response.json();
            let result:number = 0;
            for(let candidate of this.candidates){
                result++;
            }
            this.numberOfCandidates = result;
            return this.numberOfCandidates;
        });
    }
    
    getCandidate(id) {
        let url = this.candidatesUrl + "/" + id;
        return this.http.get(url).map(response => {
            return response.json();
        });
    }
}