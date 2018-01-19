import { Component } from '@angular/core';
import { InterviewsService, Interview } from 'app/interviews/services/interviews-service';
import { CandidatesService } from 'app/candidate/candidate-service';

@Component({
    selector: 'reports',
    templateUrl: `./reports.html`,
    styleUrls: ["./reportsStyles.scss"]
})

export class ReportsComponent {
    interviews: Array<Interview> = [];
    reportData = [];
    numOfCandidates: number;
    numOfInterviews: number;
    avaregeScore;
    scheduledInterviews;

    statusDataReady: boolean = false;
    showData = {
        showStatusReport: false,
        showInterviewTypeReport: false,
        showInterviewModeReport: false,
        showScoreReport: false,
        statusDataReady: false
    };

    status: Array<string> = ["Scheduled", "In Progress", "Completed", "Canceled"];
    interviewMode: Array<string> = ['online', 'offline'];
    interviewType: Array<string> = ['General', 'Technical'];
    score: Array<number> = [5, 4, 3, 2, 1];

    constructor(private interviewService: InterviewsService, private candidateService: CandidatesService) { }
    ngOnInit(): void {
        this.interviewService.getInterviews().subscribe(interviews => {
            this.interviews = interviews;
            this.pushRelevantDataToReports();
            this.showReportbyStatus("status");
            this.avaregeScore = this.interviewService.getAvaregeScore(this.interviews);
        });
        this.candidateService.getNumberOfCandidates().subscribe(numberOfCandidates => {
            this.numOfCandidates = numberOfCandidates;
        });
        this.interviewService.getNumberOfInterviews().subscribe(numberOfInterviews => {
            this.numOfInterviews = numberOfInterviews;
        });
        setTimeout(()=>{this.scheduledInterviews = Math.round(Math.random()*50)}, 500);
    }

    // Pie
    public pieChartLabels1: string[];
    public pieChartData1: number[];

    public pieChartLabels2: string[];
    public pieChartData2: number[];

    public pieChartLabels3: string[];
    public pieChartData3: number[];

    public pieChartLabels4: string[];
    public pieChartData4: number[];

    public options: any = {
        legend: {
            display: true,
            position: 'bottom',
            reverse: true,
            labels: {
                fontColor: 'grey',
                padding: 20,
            },

        }
    };

    public pieChartType: string = 'pie';
    doughnutChartColors: any[] = [{ backgroundColor: ["#fbc92e", "#00acd9", "#ee3a40", "#d9d9d8"] }];

    // events
    public chartClicked(e: any): void {
        //console.log(e);
    }

    public chartHovered(e: any): void {
        //console.log(e);
    }

    pushRelevantDataToReports() {
        let reports = ['status', 'interviewType', 'interviewMode', 'score'];
        let oneInterviewData = {};
        for (let report of reports) {
            this.reportData[report] = {};
            this.reportData[report].labels = this[report];
            this.reportData[report].values = [];
            for (let i = 0; i < this.reportData[report].labels.length; i++) {
                this.reportData[report].values[i] = 0;
                for (let interview of this.interviews) {
                    if (interview[report] === this.reportData[report].labels[i]) {
                        this.reportData[report].values[i]++;
                    }
                }
            }
        }
        this.statusDataReady = true;
    }

    showReportbyStatus(status: string) {
        let newLabels = this.reportData[status].labels;
        let newValeus = this.reportData[status].values;

        switch (status) {
            case "score":
                this.pieChartLabels2 = newLabels;
                this.pieChartData2 = newValeus;
                this.showData.showInterviewModeReport = false;
                this.showData.showInterviewTypeReport = false;
                this.showData.showStatusReport = false;
                this.showData.showScoreReport = true;
                break;
            case "interviewMode":
                this.pieChartLabels3 = newLabels;
                this.pieChartData3 = newValeus;
                this.showData.showScoreReport = false;
                this.showData.showInterviewTypeReport = false;
                this.showData.showStatusReport = false;
                this.showData.showInterviewModeReport = true;
                break;
            case "interviewType":
                this.pieChartLabels4 = newLabels;
                this.pieChartData4 = newValeus;
                this.showData.showInterviewModeReport = false;
                this.showData.showScoreReport = false;
                this.showData.showStatusReport = false;
                this.showData.showInterviewTypeReport = true;
                break;
            default:
            case "status":
                this.pieChartLabels1 = newLabels;
                this.pieChartData1 = newValeus;
                this.showData.showInterviewModeReport = false;
                this.showData.showInterviewTypeReport = false;
                this.showData.showScoreReport = false;
                this.showData.showStatusReport = true;
                break;
        }

    }



}