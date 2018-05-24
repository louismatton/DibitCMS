import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';
import Website from '../models/Website';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) {}
  ownWebsite: Website;
  pageOrder;
  page;
  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        this.pageOrder = params['pageorder'];
        // console.log(this.pageOrder);
      });
    this.websiteService.getOwnWebsite()
      .subscribe(website => {
        // console.log(website);
        this.ownWebsite = website;
        for (let page of this.ownWebsite.pages) {
          if (page.pageOrder == this.pageOrder) {
            // console.log('juist');
            // console.log(page);
            this.page = page;
          }
        }
      })
  }
  formatDate = function (date) {
    var dateOut = new Date(date);
    return dateOut;
  };
  editPost = function (postOrder) {
    // console.log(postOrder);
    let titletxt=document.getElementById("titletxt"+postOrder);
    let title=document.getElementById("title"+postOrder);

    let txt=document.getElementById("text"+postOrder);
    let btnSave=document.getElementById("save"+postOrder);
    let btnEdit=document.getElementById("edit"+postOrder);

    titletxt.classList.remove("none");
    titletxt.classList.add("show");
    title.classList.remove("show");
    title.classList.add("none");    
    txt.classList.remove("none");
    txt.classList.add("show");
    btnSave.classList.add("show");
    btnSave.classList.remove("none");
    btnEdit.classList.add("none");
    btnEdit.classList.remove("show");
  }
  // titletxt:string;
    // newdate:Date;
    // newdate=Date.now();

  savePost = function (post) {
    console.log("save");

    // console.log(post);
    // console.log(txt.ng);
    // this.websiteService.editPost(post)
    this.websiteService.editPost(post, this.pageOrder);
  }


}

