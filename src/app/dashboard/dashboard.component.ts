import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userservice: UserService, private http: HttpClient) {
  }
  ngOnInit():void {

    
      this.http.get('http://localhost:3000/tasks')
        .map(res => {
          //Maps the response object sent from the server
          // console.log(res);
          console.log(res);
        }).subscribe(tasks =>{
          console.log(tasks);
        });
    

    this.userservice.getUsers()
    .subscribe(fridges => {
      console.log(fridges);
    });
  }

}
