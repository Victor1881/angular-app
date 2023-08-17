import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthActivate} from "../guards/auth-active";
import {SearchUserComponent} from "./search-user/search-user.component";
import {ProfilePageForeignComponent} from "./profile-page-foreign/profile-page-foreign.component";


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: ProfileComponent, canActivate: [AuthActivate]},
  {path: 'search-user/:name', component: SearchUserComponent, canActivate: [AuthActivate]},
  {path: 'user-profile/:name', component: ProfilePageForeignComponent, canActivate: [AuthActivate]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
