import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "../../api/api.service";
import {User} from "../../types/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient,  private router: Router, private apiService: ApiService, private userService: UserService) {}

  getData(e: Event, email: HTMLInputElement, password: HTMLInputElement) {
    e.preventDefault();
    let data = { email: email.value, password: password.value };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // debugger
    this.http.post<any>('http://localhost:3000/login', data, { headers, withCredentials: true }).subscribe(
      (obj) => {
        if (Object.keys(obj).length === 0){
          return
        }
        this.apiService.isAuthenticated = true
        this.router.navigate(['/'])
      },
      (error) => {
        console.log(error.error);
      }
    )
  }
}
