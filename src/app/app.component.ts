import { Component, OnInit } from '@angular/core';
import User from './models/User';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  currentUser: User;

  constructor() {
    // if(localStorage.getItem('Authorization')){
    //   this.currentUser = (JSON.parse(localStorage.getItem('Authorization'))).user;
    // }
  }
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

  isStored(): boolean {
    // if (sessionStorage.getItem('Authorization')) {
    if (localStorage.getItem('Authorization')) {
      // console.log('authorized');
      return true;
    }
  }

  isNotStored(): boolean {
    if (!localStorage.getItem('Authorization')) {
      // if (!sessionStorage.getItem('Authorization')) {
      return true;
    }
  }


  isSelected(route): boolean {
    // var lis = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
    // console.log(lis);
    var paramValue = window.location.href.split("/");
    if (paramValue[3] == route) {
      return true;
    }
    if (paramValue[3] + paramValue[4] == route) {
      return true;
    }
    return false;
  }

  navigationItems: any[] = [{
      image: "fas fa-tachometer-alt fa-2x",
      name: "Dashboard",
      routerLink: "dashboard"
    },
    {
      image: "far fa-newspaper fa-2x",
      name: "Pages",
      routerLink: "pages"
    },
    {
      image: "fas fa-users fa-2x",
      name: "Users",
      routerLink: "users"
    },
    {
      image: "fas fa-cogs fa-2x",
      name: "Settings",
      routerLink: "settings"
    }
  ];

  logout() {
    // remove user from local storage to log user out
    // sessionStorage.removeItem('Authorization');
    localStorage.removeItem('Authorization');
  }
}

