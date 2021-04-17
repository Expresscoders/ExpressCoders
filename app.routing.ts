import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { RegisterComponent } from './register';
import { LogoutComponent } from './logout';
import { AuthGuard } from './_guards';
import { DashboardComponent } from './dashboard';
import { SurveyComponent } from './survery/survey.component';
import { PublicSurveyComponent } from './public_survey';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'create_survey', component: SurveyComponent, canActivate: [AuthGuard] },
    { path: 'take_survey/:id', component: PublicSurveyComponent },
    { path: "logout", component: LogoutComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);