import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // authdataraw = JSON.parse(sessionStorage.getItem('Authorization'));
  authdataraw = JSON.parse(localStorage.getItem('Authorization'));
  authdata = {
    Authorization: this.authdataraw.token
  };

  constructor(private userservice: UserService, private http: HttpClient) {}
  ngOnInit(): void {
    const requestOptions = {
      headers: new HttpHeaders(this.authdata),
    };
    console.log((this.authdataraw.token));

    this.http.get('http://localhost:3000/users', requestOptions)
      .map(res => {
        //Maps the response object sent from the server
        // console.log(res);
        console.log(res);
      }).subscribe(users => {
        console.log(users);
      });
  }
}

