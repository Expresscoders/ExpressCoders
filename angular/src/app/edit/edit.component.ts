import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { surveyModel } from '../survey';
import { SurveysService } from '../surveys.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  surveyObj:surveyModel;
  surveyId:string;
  frmGroup: FormGroup
  formBuilder:FormBuilder

  constructor(private http:HttpClient,private route:ActivatedRoute, private service:SurveysService, private router:Router) {
    this.route.params.subscribe(params => {
      this.surveyId = params.id;
    });
    //this.initializeForm();

  }

  ngOnInit(): void {
    this.getSurveyById(this.surveyId)
  }

  // To Initialize Form
//  initializeForm() {
//   this.frmGroup = this.formBuilder.group({
//   surveyName: ['', [Validators.required]],
//   option1: ['', [Validators.required]],
//   option2: ['', [Validators.required]],

//   });
//   }


  getSurveyById(surveyId){
    this.service.surveyById(surveyId).subscribe(
      res=>{this.surveyObj = res;
      this.frmGroup.patchValue({
        _id:this.surveyObj._id,
        surveyName: this.surveyObj.surveyName,
        option1: this.surveyObj.option1,
        option2: this.surveyObj.option2
      })
      }
    )
  }


  onSubmit(formData){
    return this.service.updateSurvey(this.surveyId,formData).subscribe(
      res => this.router.navigate
    )

  }

}
