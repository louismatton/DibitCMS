import { Component, OnInit } from '@angular/core';
import User from '../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser: User;

  constructor() { }

  ngOnInit() {
    console.log(this.currentUser);
    // if (sessionStorage.getItem('Authorization')) {
    if (localStorage.getItem('Authorization')) {
      // logged in so return true
      // document.getElementById("container").style.margin='70px 0 0 300px';
      // document.getElementById("loginbody").style.visibility='visible';
      this.currentUser = (JSON.parse(localStorage.getItem('Authorization'))).user;

      console.log('authorized');
    } else {
      this.currentUser.name="unknown";
      //     document.getElementById("container").style.margin='0';
      // document.getElementById("loginbody").style.visibility='invisible';
      console.log('unauthorized');
    }
  }

}
