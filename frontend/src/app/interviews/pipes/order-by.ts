import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: "orderBy",
    pure: false
})

export class OrderByPipe implements PipeTransform {
    transform(interviews: Array<any>, args: any){
        var keys = Object.keys(args);
        var result = [];
        var arrayOfinterviews=interviews;

        if (keys.length === 0){
            return arrayOfinterviews;
        }
        for (let key of keys){
            var newInterviews = arrayOfinterviews.sort(function(a: any, b: any){
                if (key === 'score'){
                    if(args[key] === 1){
                        return a[key] - b[key];
                    } else if (args[key] === -1) {
                        return b[key]-a[key];
                    } else {
                        return 0;
                    }
                } else if (key === "date") {
                    let date1 = new Date(a.date);
                    let date2 = new Date(b.date);
                    if (args[key] == 1){
                        console.log(date1 + " " + date2);
                        if (date1 > date2) {
                            console.log(1);
                            return 1;
                        } else if (date1 < date2) {
                            console.log(-1);
                            return -1;
                        } else {
                            console.log(0);
                            return 0;
                        }
                    } else if (args[key] == -1){
                        console.log(date1 + " " + date2);
                        if (date1 < date2) {
                            console.log(1);
                            return 1;
                        } else if (date1 > date2) {
                            console.log(-1);
                            return -1;
                        } else {
                            console.log(0);
                            return 0;
                        }
                    }                    
                }
            });
            
        }
        arrayOfinterviews = newInterviews;
        return arrayOfinterviews;
    };
} 


