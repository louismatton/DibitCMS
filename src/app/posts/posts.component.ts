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

    this.websiteService.editPost(post, this.pageOrder);

    let titletxt=document.getElementById("titletxt"+post.postOrder);
    let title=document.getElementById("title"+post.postOrder);

    let txt=document.getElementById("text"+post.postOrder);
    let btnSave=document.getElementById("save"+post.postOrder);
    let btnEdit=document.getElementById("edit"+post.postOrder);

    titletxt.classList.remove("show");
    titletxt.classList.add("none");
    title.classList.remove("none");
    title.classList.add("show");    
    txt.classList.remove("show");
    txt.classList.add("none");
    btnSave.classList.add("none");
    btnSave.classList.remove("show");
    btnEdit.classList.add("show");
    btnEdit.classList.remove("none");
  }
  deletePostTemp=function(postOrder){
    let sure=document.getElementById('deleteDiv');
    let postOrderInput=document.getElementById("hiddenPostOrder")
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
  deletePost = function () {
    let postOrderInput=document.getElementById("hiddenPostOrder")
    let input = postOrderInput.getAttribute("value");
    console.log(input);
    let li=document.getElementById("li"+input);
    li.style.display="none";
    this.cancelDelete();

    this.websiteService.deletePost(input, this.pageOrder);
  }
  addPostTemp=function(){
    let sure=document.getElementById('addDiv');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("show");
    sure.classList.remove('none');
  }
  cancelAddPost = function(){
    let sure=document.getElementById('addDiv');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("none");
    sure.classList.remove('show');

  }
  cancelAddTextPost = function(){
    let sure=document.getElementById('addDivText');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("none");
    sure.classList.remove('show');

  }
  addPost = function () {
    let sure=document.getElementById('addDivText');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("show");
    sure.classList.remove('none');
    this.cancelAddPost();

    // this.websiteService.deletePost(input, this.pageOrder);
  }

  addPostDef = function () {
    console.log("sup");
    let txtTitle=((document.getElementById("addText") as HTMLInputElement).value);
    let txtTxt=((document.getElementById("addTextarea") as HTMLInputElement).value);
    console.log(txtTitle, txtTxt);
    
    // li.style.display="none";
    // this.cancelDelete();
    this.cancelAddTextPost();
    this.websiteService.addPost(txtTitle, txtTxt, this.pageOrder)
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
    });
  }
}

