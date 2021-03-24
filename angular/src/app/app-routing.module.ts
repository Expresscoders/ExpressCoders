import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SurveysComponent } from './surveys/surveys.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: "/home",
    pathMatch:"full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "surveys",
    component: SurveysComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "add",
    component:AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
