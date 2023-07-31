import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftSidebarComponent} from "./left-sidebar/left-sidebar.component";
import {RightSidebarComponent} from "./right-sidebar/right-sidebar.component";



@NgModule({
  declarations: [LeftSidebarComponent, RightSidebarComponent],
  imports: [
    CommonModule,
  ],
  exports: [LeftSidebarComponent, RightSidebarComponent]
})
export class SidebarsModule { }
