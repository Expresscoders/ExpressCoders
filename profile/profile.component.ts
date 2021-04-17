import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { User } from '@/_models';
import { AlertService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    profileDetails: any;
    loadingProfile: boolean;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        // this.loadAllUsers();
        this.loadingProfile = true;
        this.authenticationService.fetchProfileDetails().subscribe((details) => {
            this.loadingProfile = false;
            this.profileDetails = details;
            console.log(this.profileDetails)
        }, error => {
            this.loadingProfile = false;
        })
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => {
    //         this.loadAllUsers()
    //     });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().pipe(first()).subscribe(users => {
    //         this.users = users;
    //     });
    // }
}