import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: "interviewsPipe",
    pure: false
})

export class InterviewsPipe implements PipeTransform {
    transform(interviews: Array<any>, args: any) {
        if (typeof interviews === 'object') {
            var keys = Object.keys(args);
            let arrayOfInterviews = interviews;
            var dateSort;
            var scoreSort;
            
            if (Object.keys(args).length === 0) {
                return arrayOfInterviews;
            }
            else {
                for (let key of keys) {
                    let resultArray = [];
                    for (let interview of arrayOfInterviews) {
                         if (key === "position") {
                            if ((interview.positionName.toUpperCase().indexOf(args[key].toUpperCase()) !== -1 || interview.positionNumber.toString().toUpperCase().indexOf(args[key].toUpperCase()) !== -1)) {
                                resultArray.push(interview);
                            }
                        } else {
                            if (interview[key].toUpperCase().indexOf(args[key].toUpperCase()) !== -1) {
                                resultArray.push(interview);
                            }
                        } 
                    } 
                    arrayOfInterviews = resultArray;
                }
            }
            
            return arrayOfInterviews;
        }
        else {
            return null;
        }

    }
} 


