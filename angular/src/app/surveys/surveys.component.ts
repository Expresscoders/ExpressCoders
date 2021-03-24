import { Component, OnInit } from '@angular/core';
import{surveyModel} from '../survey'
import{SurveysService} from "../surveys.service"

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html', 
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  surveyList : surveyModel[] = []
  constructor(private _surveyService: SurveysService) { }

  ngOnInit():void {this._surveyService.getsurveys().subscribe(
    data => {this.surveyList = data },
    err => console.log(err)
  ) }
 
    
  }  


