import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormsModule,ReactiveFormsModule} from '@angular/forms'
import { surveyModel } from '../survey';
import{SurveysService} from "../surveys.service"

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  surveyItem:surveyModel[] = []
  postUrl = "http://localhost:3000/about"

  constructor() { }

  ngOnInit(): void {
  }
 
  

}
