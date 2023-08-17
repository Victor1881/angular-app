import { NgModule } from '@angular/core';
import {CommonModule, NgSwitchCase} from '@angular/common';
import { RegisterComponent } from './register/register.component';
import {UserRoutingModule} from "./user-routing-module";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {HomeModule} from "../home/home.module";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";
import { SearchUserComponent } from './search-user/search-user.component';
import { ProfilePageForeignComponent } from './profile-page-foreign/profile-page-foreign.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SearchUserComponent,
    ProfilePageForeignComponent
  ],
    imports: [
      CommonModule,
      UserRoutingModule,
      HomeModule,
    ]
})
export class UserModule { }
