import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../_models/user";

@Injectable()
export class AuthenticationService {
    url:string = 'http://localhost:9090/exam-portal/user';
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(this.url+'/authenticate', JSON.stringify({ userId: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        let user:User = JSON.parse(localStorage.getItem('currentUser'));
        this.http.delete(this.url+'/logout', JSON.stringify({ userId: user.userId , token: user.token }))
            .map((response: Response) => {
                let user = response.json();
                localStorage.removeItem('currentUser');
            });
    }
}