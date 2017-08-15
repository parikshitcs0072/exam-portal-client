import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { Router, ActivatedRoute ,ParamMap} from '@angular/router';


import { User,FileUpload } from '../_models/index';
import { Question } from '../_models/index';
import { ExamService } from '../_services/index';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'questions.component.html'
})

export class QuestionsComponent implements OnInit,OnChanges {
    currentUser: User;
    question:Question ;
    x:number;
    nextUrl:string;
    qId:String;
    uploadData:FileUpload={};

    constructor(private examService: ExamService,private router: Router,private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.x = +params['qid'];
            console.log(this.x);
            this.question = this.examService.getQuestion(this.x);
            console.log(this.question);
        });
    console.log(this.question);
    }
    
    ngOnChanges(){
        this.route.params.subscribe(params =>{
            this.x = +params['qid'];
            console.log(this.x);
            this.question = this.examService.getQuestion(this.x);
            console.log(this.question);
        });
    console.log(this.question);

    }
    
    nextQuestion(){
        let id = this.x +1;
        let url ='/questions/1';
        console.log(url);
        this.router.navigate([url]);
    }
    prevQuestion(){
        let id = this.x-1;
        let url ='/questions/'+id;
        this.router.navigate([url]);
    }

    uploadFile(event:any){
        //let file = event.srcElement.files[0];
        //let fileName = file.name;
        //console.log(file)
        // console.log(fileName)
        // let formData = new FormData();
        // formData.append('file',file);
        // this.examService.uploadAnswer(formData).subscribe(
        //     (data)=>console.log(data)
        // );
    }

    uploadAnswer(file:FileList){
        console.log(file)
        console.log(file.item(0))
        let formData = new FormData();
        formData.append('file',file.item(0));
        formData.append('userId',this.currentUser.userId);
        formData.append('qId',this.question.questionId);
        formData.append('questionnaireID',this.examService.questionnaireId);
        this.examService.uploadAnswer(formData).subscribe(
             (data)=>console.log(data)
         );
    }
}
