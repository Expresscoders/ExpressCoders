import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormsModule,ReactiveFormsModule} from '@angular/forms'
import { surveyModel } from '../survey';
import{SurveysService} from "../surveys.service"

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  surveyItem:surveyModel[] = []
  postUrl = "http://localhost:3000/add"

  constructor(private form: FormsModule, private surveyService:SurveysService, private http:HttpClient) { }
  ngOnInit() {
  }
 
  onSubmit(formData){
      this.http.post("http://localhost:3000/add",formData).subscribe(
      (res) => console.warn(res) ,
      (err) =>{console.log(err)}
    )
    //console.log(formData)
    
  }

}
