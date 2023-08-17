import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../types/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
}
