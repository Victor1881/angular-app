import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  isAuthenticated: boolean = false
  constructor(private http: HttpClient) {
    this.checkAuthentication().subscribe((response: any) => {
      this.isAuthenticated = response?.authenticated || false;
    });
  }

  checkAuthentication(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>('http://localhost:3000/check-authentication', { headers, withCredentials: true });
  }
}

