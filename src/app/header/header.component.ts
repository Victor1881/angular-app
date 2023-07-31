import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  isAuthenticated: boolean = false
  constructor(private http: HttpClient,  private router: Router, private apiService: ApiService) {}




  logout(){
    this.http.delete('http://localhost:3000/logout', { withCredentials: true }).subscribe(
      (response) => {
        this.router.navigate(['/login'])
        window.location.reload()
      },
      (error) => {
        console.log(error.error);
      }
    )
  }
}
