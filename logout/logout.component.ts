import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';

@Component({ template: "" })
export class LogoutComponent implements OnInit, OnDestroy {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        // this.loadAllUsers();
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
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