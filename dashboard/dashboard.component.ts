import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AlertService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { SurveyService } from '@/_services/survey.service';

@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    createdSurveys: any;

    constructor(
        private authenticationService: AuthenticationService,
        private surveryService: SurveyService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
            console.log(this.currentUser)
        });
    }

    deleteSurvey(_id: any) {
        this.surveryService.deleteSurvey(_id).subscribe(data => {
            this.createdSurveys = this.createdSurveys.filter(s => s._id != _id);
        }, error => {
            this.alertService.error("Failure deleting survey!");
        })
    }

    ngOnInit() {
        this.surveryService.fetchPersonalSurveys().subscribe(data => {
            this.createdSurveys = data;
        }, error => {
            this.alertService.error("Failure loading surveys!");
        });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

}