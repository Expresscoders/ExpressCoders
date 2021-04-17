import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { SurveyService } from '@/_services/survey.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    surveys: any;

    constructor(
        private authenticationService: AuthenticationService,
        private surveyService: SurveyService,
        private router: Router
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
        this.surveys = [];
        // this.loadAllUsers();
        this.surveyService.fetchSurveys().subscribe((data) => {
            this.surveys = data;
        }, err => {
            
        })
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

}