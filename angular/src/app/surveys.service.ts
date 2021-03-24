import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http"
//import  { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})


export class SurveysService {

  private _surveyUrl = "http://localhost:3000/surveys"
  constructor(private http:HttpClient) { }

  getsurveys(){
    return this.http.get<any>(this._surveyUrl)
  }

    //addSurvey(newsuryveyItem){
      //let header = new Headers({'Content-Type':'application/json'})
      //return this.http.post<any>("http://localhost:3000/add",newsuryveyItem).toPromise().then(
        //data=>{console.log(data)},
        //err=>{console.log(err)}
      //)
    }
  


  