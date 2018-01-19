import { Component, Input, Output } from '@angular/core';
import { InterviewsComponent } from 'app/interviews/interviews';
import { EventEmitter } from '@angular/common/src/facade/async';
import { Interpolation } from '@angular/compiler/src/expression_parser/ast';
import { Interview } from 'app/interviews/services/interviews-service';

@Component({
    selector: 'modal',
    templateUrl: `./modal.html`,
    styleUrls: ["./modalStyles.scss"]
})

export class ModalComponent {
    @Input() openmodal: boolean;
    @Input() newInterview: boolean;
    @Output() onCancelClick = new EventEmitter();
    @Output() onSaveClick = new EventEmitter();
    @Input() interview: Interview;
    @Input() statuses: Array<string>;
    @Input() types: Array<string>;

    posNumValid:boolean = true;
    dateValid:boolean = true;

    checkIfValidNumber(e) {
        let regex = /^[0-9]+$/;
        this.posNumValid = regex.test(e.target.value);
        return regex.test(e.target.value);
    }

    checkIfDateIsValid($event){
        let today = new Date();
        let interviewDate = new Date($event.target.value);

        if(interviewDate > today){
            this.dateValid = true;
            return true;
        } else {
            this.dateValid = false;
            return false;
        }
    }

    doCancelClick(e, interview) {
        this.onCancelClick.emit([e, interview]);
    }

    doSaveClick(e, interview) {
        if(this.dateValid && this.posNumValid){
            this.onSaveClick.emit([e, interview]);
        }
    }
}
