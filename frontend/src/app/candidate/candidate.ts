import { Component } from '@angular/core';
import { Candidate, CandidatesService } from './candidate-service';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
    selector: 'candidate',
    templateUrl: `./candidate.html`,
    styleUrls: ["./candidateStyles.scss"]
})

export class CandidateComponent {
    candidates = [];
    candidateId: string;
    candidate: any = null;

    constructor(private candidateService: CandidatesService,
                private _route: ActivatedRoute){
        this.candidateId = this._route.snapshot.params['id'];
    }

    ngOnInit(): void{
        this.candidateService.getCandidate(this.candidateId).subscribe(candidate => {
            this.candidate = candidate;
        });
    }
}
