import { Component } from '@angular/core';
import {User} from "../../../types/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "../../../api/api.service";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {
  user: User | undefined
  constructor(private http: HttpClient,  private router: Router, public apiService: ApiService, private userService: UserService) {
    this.userService.getUser().subscribe(
      (user: User) => {
        if (user){
          this.user = user
        }
      })
  }

  fetchUser(): void {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user
        console.log(this.user)

      },
      (error) => {
        console.log(error.error);
      }
    )
  }
}
