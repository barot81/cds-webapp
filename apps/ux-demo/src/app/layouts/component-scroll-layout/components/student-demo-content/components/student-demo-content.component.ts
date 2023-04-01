import { Component } from "@angular/core";

@Component({
    selector: 'zhealthcare-student-demo-content',
    templateUrl: 'student-demo-content.component.html'
})
export class StudentDemoContent {
    workexperiences = [{ schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
    { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
    { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
    { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" }
    ];
    constructor() { }

    ngOnInit() {
    }

}