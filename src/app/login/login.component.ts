// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from "@angular/router";
// import { Observable } from 'rxjs/Observable';
// import { tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   loginData = { username:'', password:'' };
//   message = '';
//   data: any;

//   constructor(private http: HttpClient, private router: Router) {

//   }
//   ngOnInit() {}

//   login() {
//     this.http.post('/api/signin',this.loginData).subscribe(resp => {
//       this.data = resp;
//       localStorage.setItem('jwtToken', this.data.token);
//       this.router.navigate(['books']);
//     }, err => {
//       this.message = err.error.msg;
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
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
  loginData = { username:'', password:'' };
  message = '';
  data: any;
  returnUrl: string;
  model: any = {};
  loading = false;


  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,

    private router: Router,
    private authenticationService: AuthenticationService) {

  }
  ngOnInit() {
            // reset login status
            this.authenticationService.logout();

            // get return url from route parameters or default to '/'
            // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
  }

  // login() {
  //   this.http.post('/api/signin',this.loginData).subscribe(resp => {
  //     this.data = resp;
  //     localStorage.setItem('jwtToken', this.data.token);
  //     this.router.navigate(['books']);
  //   }, err => {
  //     this.message = err.error.msg;
  //   });
  // }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });
}

}

