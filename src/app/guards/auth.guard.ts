import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (localStorage.getItem('Authorization')) {
        if (sessionStorage.getItem('Authorization')) {
            // logged in so return true
            // document.getElementById("container").style.margin='70px 0 0 300px';
            // document.getElementById("loginbody").style.visibility='visible';
            console.log('authorized');
    
            return true;
        }
        // document.getElementById("container").style.margin='0';
        // document.getElementById("loginbody").style.visibility='invisible';
        console.log('unauthorized');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}