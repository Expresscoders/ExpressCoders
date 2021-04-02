import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http"
//import  { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})


export class SurveysService {

  private _surveyUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  getSurveys(){
    return this.http.get<any>(this._surveyUrl+"/surveys")
  }

  surveyById(surveyId){
    return this.http.get<any>(`${this._surveyUrl}/edit/${surveyId}`)
  }
  updateSurvey(surveyId,body){
    return this.http.post<any>(`${this._surveyUrl}/update/${surveyId}`, body)
  }



  }



