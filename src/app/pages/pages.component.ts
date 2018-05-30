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
  deletePageTemp=function(postOrder){
    let sure=document.getElementById('deleteDiv');
    let postOrderInput=document.getElementById("hiddenPageOrder")
    postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("show");
    sure.classList.remove('none');
  }
  cancelDelete = function(){
    let sure=document.getElementById('deleteDiv');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("none");
    sure.classList.remove('show');

  }
  deletePage = function () {
    let postOrderInput=document.getElementById("hiddenPageOrder")
    let input = postOrderInput.getAttribute("value");
    console.log(input);
    let li=document.getElementById("li"+input);
    li.style.display="none";
    this.cancelDelete();

    this.websiteService.deletePage(input);
  }
  cancelAdd = function(){
    let sure=document.getElementById('addDiv');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("none");
    sure.classList.remove('show');

  }

}
