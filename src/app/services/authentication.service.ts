import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/users`;
  constructor(private http: HttpClient) {}

  login(loginData) {
    return this.http.post < any > ('http://localhost:3000/login',loginData)
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('Authorization', JSON.stringify(user));
        }

        return user;
      });
  }

    // login() {
  //   console.log(this.loginData);
  //   this.http.post('http://localhost:3000/login', this.loginData)
  //     .subscribe(
  //       resp => {
  //         this.data = resp;
  //         console.log(this.loginData, this.data);
  //         // sessionStorage.setItem('Authorization', JSON.stringify(this.data));
  //         localStorage.setItem('Authorization', JSON.stringify(this.data));

  //         this.router.navigate(['dashboard']);
  //       }, err => {
  //         this.message = err.error.msg;
  //       });
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('Authorization');
  }
}

