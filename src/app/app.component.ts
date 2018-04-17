import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

ngOnInit(){
  if (sessionStorage.getItem('Authorization')) {
    // logged in so return true
    // document.getElementById("container").style.margin='70px 0 0 300px';
    // document.getElementById("loginbody").style.visibility='visible';
    console.log('authorized');
  }else{
        //     document.getElementById("container").style.margin='0';
        // document.getElementById("loginbody").style.visibility='invisible';
        console.log('unauthorized');

  }

}

isStored(): boolean {
  if (sessionStorage.getItem('Authorization')) {
    // console.log('authorized');
    return true;
  }
}

isNotStored(): boolean {
  if (!sessionStorage.getItem('Authorization')) {
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
    // ,
    // {
    //   image: "fas fa-sign-out-alt fa-2x",
    //   name: "Signout",
    //   routerLink: "signout"
    // }
  ];
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('Authorization');
  }



  // div container
  // div loginbody
}
