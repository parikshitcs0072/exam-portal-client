import { Injectable } from '@angular/core';
import { Http, Headers, Response ,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User,FileUpload,Question} from "../_models/index";

@Injectable()
export class ExamService {
    url:string = 'http://localhost:9090/exam-portal/user';
    questions: Question[] = [];
    questionnaireId:string ;
    q:string [] =[];
    constructor(private http: Http) { }

    getQuestion(id: number){
        return this.questions[id];
    }
    getQuestionId(id:number){
        return this.q[id];
    }

    startExam(userid: string, token: string , authenticated: boolean) {
        return this.http.post(this.url+'/startexam',  JSON.stringify({ userId: userid , token: token ,authenticated: authenticated }))
            .map((response: Response) => {
                let res = response.json();
            Object.keys(res).forEach(name =>
                this.questions=res[name]
            );
            this.questionnaireId = Object.keys(res)[0];
            console.log(this.questionnaireId);
            }); 
        
     

     }
        uploadAnswer(formData:FormData){  
            console.log(formData.get('file'))
            return this.http.post(this.url+'/uploadanswer', formData)
            .map((response: Response) => {
                let res = response.json();
            Object.keys(res).forEach(name =>
                this.questions=res[name]
            );
            });      
    }
}