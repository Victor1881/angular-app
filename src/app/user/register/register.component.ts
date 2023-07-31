import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient,  private router: Router) {}

  getGender(m: HTMLInputElement, f: HTMLInputElement){
    if (m.checked){
      return 'Male'
    }
    if (f.checked){
      return 'Female'
    }
    return ''
  }

  getData(e: Event, firstName: HTMLInputElement, lastName: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, repass: HTMLInputElement, gender: string, birthday: HTMLInputElement){
    e.preventDefault()
    let data = {email: email.value, firstName: firstName.value, lastName: lastName.value, birthday: birthday.value, password: password.value, repass: repass.value}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.post('http://localhost:3000/register', data, { headers }).subscribe(
      (response) => {
        this.router.navigate(['/login'])
      },
      (error) => {
        let errorMessage = error.error.error
        errorMessage = errorMessage.replace(/(\w+:\s*)/g, '').trim()
        const removeMessage = errorMessage.indexOf('User validation ');
        if (removeMessage !== -1) {
          errorMessage = errorMessage.slice(removeMessage + 16);
        }

        window.alert(errorMessage);
      }
    )
  }
}
