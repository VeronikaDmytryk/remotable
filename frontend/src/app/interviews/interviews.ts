import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { InterviewsService, Interview } from './services/interviews-service';
import { InterviewsPipe } from './pipes/interviews-search';
import { SearchService } from './services/seach-service';
var bowser = require('bowser');

@Component({
    selector: 'interviews',
    templateUrl: `./interviews.html`,
    styleUrls: ["./interviewsStyles.scss"]
})

export class InterviewsComponent implements OnInit {
    statusChanged: boolean = false;
    interviews = [];
    openmodal = false;
    searchKeyword: string = "";
    interviewType: string = "";
    supportedBrowser = (bowser.msie || bowser.msedge)?false:true;
    filterValues = {};
    orderValues = {};


    searchFields = {
        position: false,
        candidate: false,
        interviewer: false,
        creator: false
    }
    
    interviewMode;
    @ViewChild('statusSelect') statusSelect;
    @ViewChild('type') typeSelect;

    newInterview: boolean = false;
    currentInterview = {};
    initialInterview = {};
    userName = "Amidala"; // Hardcoded user name as this tool is not integrated with authentication
    timeOptions = { year: 'numeric', month: 'short', day: 'numeric', hour12: true };
    statuses = ["Scheduled", "In Progress", "Canceled", "Completed"];
    types = ["General", "Technical"];

    constructor(private interviewService: InterviewsService, private searchService: SearchService) { };

    ngOnInit(): void {
        this.interviewService.getInterviews().subscribe(interviews => {
            this.interviews = interviews;
        });
        this.searchService.searchKeyword.subscribe(keyword => {
            this.searchKeyword = keyword;
        });

    }

    addClick(status: string, score: string, creator: string) {
        this.openmodal = true;
        this.newInterview = true;
        this.currentInterview = { status: "Scheduled", interviewType: "General", interviewMode: "online", score: "", creator: this.userName }
    }

    editClick(interviewId: number) {
        console.log(interviewId);
        this.newInterview = false;
        this.openmodal = true;
        var initialValue;
        for (let i = 0; i < this.interviews.length; i++) {
            if (this.interviews[i]._id === interviewId) {
                this.currentInterview = this.interviews[i];
                initialValue = this.interviews[i];
            }
        }
        this.initialInterview = Object.assign({}, initialValue);
    }

    deleteClick(currentInterview: Interview) {
        for (let i = 0; i < this.interviews.length; i++) {
            let interview = this.interviews[i];
            if (interview._id === currentInterview._id) {
                this.interviews.splice(i, 1);
            }
        }
        this.interviewService.deleteInterview(currentInterview._id);
    }

    saveClick(args) {
        if (args[1].candidate && args[1].positionName && args[1].positionNumber && args[1].interviewType && args[1].interviewMode && args[1].date && args[1].interviewer) {
            this.openmodal = false;
            this.currentInterview = null;
            console.log(args[1]);
            let interview = args[1];
            if (this.newInterview) {
                this.interviewService.addInterview(interview).subscribe((response)=>{
                    var interview = response.json();
                    this.interviews.push(interview);
                });
                this.newInterview = false;
            } else {
                this.interviewService.updateInterview(interview);
            }
        }
        
    }

    cancelClick(args) {
        this.openmodal = false;
        this.newInterview = false;
        this.currentInterview = null;
        this.openmodal = false;
        let interview = args[1];
        for (let i = 0; i < this.interviews.length; i++) {
            if (this.interviews[i]._id === interview._id) {
                this.interviews.splice(i, 1);
                this.interviews.splice(i, 0, this.initialInterview);
            }
        }
    }

    interviewModeClick(value) {
        if (this.filterValues["interviewMode"] === value) {
            this.removeFromFilterValues("interviewMode");
            this.interviewMode = null;
        } else {
            this.interviewMode = value;
            this.changeFilterValues('interviewMode', value);
        }
    }

    changeFilterValues(parameter: any, value: any) {
        if (!value && this.filterValues[parameter]) {
            this.statusSelect.nativeElement.value = null;
            this.typeSelect.nativeElement.value = null;
            this[parameter] = false;
            this.removeFromFilterValues(parameter);
        };
        if (Object.keys(this.filterValues).length === 0 && value) {
            var param = {};
            param[parameter] = value
            this.filterValues = param;
        } else {
            if (Object.keys(this.filterValues).length > 0) {
                if (this.filterValues[parameter]) {
                    this.filterValues[parameter] = value;
                } else if (value) {
                    var param = this.filterValues;
                    param[parameter] = value;
                    this.filterValues = param;
                }
            }
        }
    }

    removeFromFilterValues(parameter: any) {
        let filterValues = this.filterValues;
        delete filterValues[parameter];
        this.filterValues = filterValues;
    }

    sort(column: string) {
        if (this.orderValues[column] === undefined || this.orderValues[column] === null) {
            this.orderValues[column] = 1;
        } else if (this.orderValues[column] === 1) {
            this.orderValues[column] = -1;
        } else {
            this.interviewService.getInterviews().subscribe(interviews => {
                this.interviews = interviews;
            });
            this.orderValues[column] = null;
        }

    }

    searchClick(columnName){
        let fields = Object.keys(this.searchFields);
        for(let i = 0; i<fields.length; i++){
            let field = fields[i];
            if(field !== columnName && this.searchFields[field] === true && !this.filterValues[field]){
                this.searchFields[field] = false;
            }
        }
        this.searchFields[columnName] = true;
    }

    getStyle(status: string) {
        switch (status) {
            case "Scheduled":
                return "#00acd9";
            case "In Progress":
                return "#fbc92e";
            case "Canceled":
                return "#ee3a40";
            case "Completed":
                return "#539e3f";
            default:
                return "";
        }
    }
}
