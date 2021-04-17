import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AlertService, AuthenticationService } from '@/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '@/_services/survey.service';

import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({ templateUrl: 'publicsurvey.template.html' })
export class PublicSurveyComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    activeSurvey: any;

    surveyForm: FormGroup
    questions: any;
    isSubmited: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private surveyService: SurveyService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/dashboard']);
        }

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.isSubmited = false;
        this.surveyForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            questions: new FormArray([])
        })

        const routeParams = this.route.snapshot.paramMap;
        const surveyId = routeParams.get('id');
        this.surveyService.fetchSurvey(surveyId).subscribe((data) => {
            this.activeSurvey = data;
            console.log(this.activeSurvey)
            this.buildQuestionsForm(data.Questions);
        }, err => {
            this.alertService.error("Failure loading survey, please refresh the page or try taking other surveys.");
        })
    }

    get t() { return this.surveyForm.controls.questions as FormArray; }

    buildQuestionsForm(questions: any[]) {
        for (let question of questions) {

            if (question.IsMultiChoice) {
                let choices = {};

                for (let i = 1; i <= question.Choices.length; i++) {
                    choices[`mc${i}Value`] = [''];
                }

                this.t.push(this.formBuilder.group(choices));
            }

            if (question.IsAgreeDisagree) {
                this.t.push(this.formBuilder.group({
                    "agree_disagree": [''],
                }));
            }

            if (question.IsShortAnswer) {
                this.t.push(this.formBuilder.group({
                    "answer": ['']
                }));
            }

        }
    }

    onSubmit() {


        this.isSubmited = true;
        if ( this.surveyForm.invalid ) {
            return;
        }

        // Build answers
        let answers = [];

        for ( let question of this.t.value ) {

            answers.push({
                "is_multi_choice": this.isMultiCQuestion(question),
                "is_agree_disagree": "agree" in question,
                "is_short_answer": "answer" in question,
                "choices": this.isMultiCQuestion(question)? question: [],
                "answer": "answer" in question? question.answer : null,
                "agree": "agree" in question? question.agree: null
            });
        }

        this.surveyService.saveAttendedSurvey({
            "_id": this.activeSurvey._id,
            "email": this.surveyForm.value.email,
            "fullName": this.surveyForm.value.fullName,
            "answers": answers
        }).subscribe(data => {
            this.router.navigate(["/"]);
        }, error => {
            this.alertService.error("Failed to save!");
        })
        console.log((this.surveyForm.value));
    }

    onReset() {
        this.isSubmited = false;
        this.surveyForm.reset();
    }

    onClear() {
        this.isSubmited = false;
        this.t.reset();
    }

    isMultiCQuestion(question: any) {
        return "mc1Value" in question || "mc2Value" in question || "mc3Value" in question || "mc4Value" in question;
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

}