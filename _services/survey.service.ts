import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class SurveyService {

    constructor(private http: HttpClient) {
    }

    fetchSurveys() {
        return this.http.get<any>(`${config.apiUrl}/survey/list/`).pipe(map(surveys => {
            return surveys.data;
        }, error => {
            return error;
        }));
    }

    fetchPersonalSurveys() {
        return this.http.get<any>(`${config.apiUrl}/survey/get/personal/`, {
            headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token
            }
        }).pipe(map(surveys => {
            return surveys.data;
        }, error => {
            return error;
        }));
    }

    createSurvey(questions, title, expiryDays) {
        return this.http.post<any>(`${config.apiUrl}/survey/save/`, {
            questions: questions,
            title: title,
            expiryDays: expiryDays
        }, {
            headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token
            }
        }).pipe(map(surveys => {
            return surveys.data;
        }, error => {
            return error;
        }))
    }

    deleteSurvey(id: any) {
        return this.http.get<any>(`${config.apiUrl}/survey/delete/personal/${id}`, {
            headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token
            }
        }).pipe(map(data => {
            return data.data;
        }, error => {
            return error;
        }))
    }

    saveAttendedSurvey(data: any) {
        return this.http.post<any>(`${config.apiUrl}/survey/attended/save/${data._id}`, {
            answers: data.answers,
            full_name: data.fullName,
            email: data.email
        }).pipe(map(surveys => {
            return surveys.data;
        }, error => {
            return error;
        }))
    }

    fetchSurvey(id: String) {
        return this.http.get<any>(`${config.apiUrl}/survey/get/${id}`).pipe(map(survey => {
            return survey.data;
        }, error => {
            return error;
        }));
    }
}