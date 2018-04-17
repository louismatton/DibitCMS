import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = { email:'', password:'' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router, private authenticationServce: AuthenticationService) {

  }
  ngOnInit() {
            // reset login status
            this.authenticationServce.logout();

            // get return url from route parameters or default to '/'
            // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
  }

  login() {
    this.authenticationServce.login(this.loginData)
        .subscribe(
            data => {
                this.router.navigate(['dashboard']);
            },
            error => {
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


}
