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

  addPageTemp= function(){
    let sure=document.getElementById('addDiv');
    sure.classList.add("show");
    sure.classList.remove('none');
  }

  addPage = function () {
    let sure=document.getElementById('addDiv');
    let txtTitle=((document.getElementById("txtPageTitle") as HTMLInputElement).value);

    sure.classList.add("none");
    sure.classList.remove('show');

    this.websiteService.addPage(txtTitle);
  }

}
