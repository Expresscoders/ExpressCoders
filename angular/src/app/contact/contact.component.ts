import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormsModule,ReactiveFormsModule} from '@angular/forms'
import { surveyModel } from '../survey';
import{SurveysService} from "../surveys.service"

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  surveyItem:surveyModel[] = []
  postUrl = "http://localhost:3000/contact"

  constructor() { }

  ngOnInit(): void {
  }
 
  

}
