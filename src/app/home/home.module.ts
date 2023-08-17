import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {PostSenderComponent} from "./post-sender/post-sender.component";
import {PostsComponent} from "./posts/posts.component";
import {SidebarsModule} from "./sidebars/sidebars.module";



@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostSenderComponent
  ],
  exports: [
    PostsComponent, HomeComponent, PostSenderComponent, SidebarsModule
  ],
  imports: [
    CommonModule,
    SidebarsModule
  ]
})
export class HomeModule { }
