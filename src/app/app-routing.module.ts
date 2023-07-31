import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthActivate} from "./guards/auth-active";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/'},
  {path: '', component: HomeComponent, canActivate: [AuthActivate],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
