import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { User } from '../_models/index';
import { Question } from '../_models/index';
import { ExamService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    returnUrl: string;
    firstUrl :string;

    constructor(private examService: ExamService,private router: Router,private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.returnUrl ='/questions/';
        
    }

    ngOnInit() {
    }

    startExam(){
        this.examService.startExam(this.currentUser.userId,this.currentUser.token,this.currentUser.authenticated)
            .subscribe((data) => {
               console.log("inside home",this.examService.questions)
               this.returnUrl = '/questions/0';
               this.router.navigate([this.returnUrl]);
               // let value = data[Object.keys(data)[0]];
            });
    }
}