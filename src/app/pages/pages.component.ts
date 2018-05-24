import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';
import Website from '../models/Website';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private websiteService: WebsiteService) { }
  ownWebsite:Website;
  ngOnInit() {
    this.websiteService.getOwnWebsite()
    .subscribe(website=>{
      console.log(website);
      this.ownWebsite = website;
    })
  }
  formatDate = function(date){
    var dateOut = new Date(date);
    return dateOut;
};
//  visitPage =function(){
//   Window.location='posts';
// }
// editPage = function (){
//   // Location.path( '/new-page.html' );
//   // location.href = '#/new-page.html';
// };

}
