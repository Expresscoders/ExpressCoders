import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(emailOrUsername: string, password: string) {
        console.log(`${config.apiUrl}/auth/login/`);
        return this.http.post<any>(`${config.apiUrl}/auth/login/`, { "emailOrUsername": emailOrUsername, "password": password })
            .pipe(map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    register(regParams) {
        console.log(regParams);
        return this.http.post<any>(`${config.apiUrl}/auth/register/`, { "email": regParams.email, "username": regParams.username, "password": regParams.password })
            .pipe(map(user => {
                console.log(user);
                return user;
            }));
    }

    fetchProfileDetails() {
        return this.http.get<any>(`${config.apiUrl}/auth/profile/`, {
            headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token
            }
        }).pipe(map(details => {
            return details.data;
        }, error => {
            return error;
        }))
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}