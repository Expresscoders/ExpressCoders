import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http"
//import  { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})


export class SurveysService {

  private _surveyUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }
  //Read operation
  getSurveys(){
    return this.http.get<any>(this._surveyUrl+"/surveys")
  }
  //To Find Survey By ID
  surveyById(surveyId){
    return this.http.get<any>(`${this._surveyUrl}/edit/${surveyId}`)
  }

  //Update Operation
  updateSurvey(surveyId,body){
    return this.http.post<any>(`${this._surveyUrl}/update/${surveyId}`, body)
  }

  //Create Operation
  createSurvey(formData){
    return this.http.post<any>(this._surveyUrl+"/add",formData)
  }

  //Delete Operation
  deleteSurvey(surveyId){
    return this.http.delete<any>(`${this._surveyUrl}/delete/${surveyId}`)
  }


  }



