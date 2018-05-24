import { User } from '../models/User';
import { Website } from '../models/Website';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from "@angular/core";
// import { httpParamSerializerJQLike } from ''
// import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';

@Injectable()
export class WebsiteService {

  api_url = 'http://localhost:3000';
  websiteUrl = `${this.api_url}/website`;

  constructor(private http: HttpClient) {}
  authdataraw = JSON.parse(localStorage.getItem('Authorization'));
  authdata = {
    Authorization: this.authdataraw.token
  };

  requestOptions = {
    headers: new HttpHeaders(this.authdata)
  };

  createWebsite(website: Website): Observable < any > {
    //returns the observable of http post request 
    return this.http.post(`${this.websiteUrl}`, website);
  }


  getOwnWebsite(): Observable < Website > {
    return this.http.get(`${this.websiteUrl}`, this.requestOptions)
      .map(res => {
        //Maps the response object sent from the server
        // console.log(res);
        return res as Website;

      });
  }
      
  editPost(post, pageOrder):void{
    post.pageOrder=Number(pageOrder);
  
      this.http.post(this.websiteUrl+'/editpost', post ,this.requestOptions)
      .subscribe(res => {
        console.log("done", res);
        // return res as Website;
      });
    }

  getWebsiteById(id: String): Observable < Website > {
    let getUrl = `${this.websiteUrl}`
    return this.http.get(getUrl + "/" + id)
      .map(res => {
        //Maps the response object sent from the server

        return res as Website;
      })
  }

  editWebsite(website: Website) {
    let editUrl = `${this.api_url}/website/${website._id}/${website.title}`;
    console.log(editUrl);
    // console.log(JSON.stringify(website));
    return this.http.put(editUrl, "");
  }

  editWebsiteStatus(id: String, status: Number) {
    let editUrl = `${this.websiteUrl}/status/${id}/${status}`;
    console.log("editurl", editUrl, "  status", status);
    return this.http.put(editUrl, "");
  }

  //Default Error handling method.
  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}