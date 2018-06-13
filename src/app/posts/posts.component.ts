import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';
import Website from '../models/Website';
import { ActivatedRoute, Params } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService, private ng2ImgMax: Ng2ImgMaxService) {}
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
      });
  }

  formatDate = function (date) {
    var dateOut = new Date(date);
    return dateOut;
  };
  editPost = function (postOrder) {
    // console.log(postOrder);
    let vis=document.getElementById('vis'+postOrder);

    let titletxt=document.getElementById("titletxt"+postOrder);
    let title=document.getElementById("title"+postOrder);

    let txt=document.getElementById("text"+postOrder);
    let btnSave=document.getElementById("save"+postOrder);
    let btnEdit=document.getElementById("edit"+postOrder);

    vis.classList.add("none");
    vis.classList.remove("show");
    
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
    let vis=document.getElementById('vis'+post.postOrder);

    vis.classList.add("show");
    vis.classList.remove("none");
  
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

  deletePost = function () {
    let postOrderInput=document.getElementById("hiddenPostOrder")
    let input = postOrderInput.getAttribute("value");
    console.log(input);
    let li=document.getElementById("li"+input);
    li.style.display="none";
    this.cancelAddPost("deleteDiv");

    this.websiteService.deletePost(input, this.pageOrder);
  }
  addPostTemp=function(){
    let sure=document.getElementById('addDiv');
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("show");
    sure.classList.remove('none');
  }
  
  cancelAddPost = function (id) {
    let sure = document.getElementById(id);
    // let postOrderInput=document.getElementById("hiddenPostOrder")
    // postOrderInput.setAttribute('value',postOrder);
    sure.classList.add("none");
    sure.classList.remove('show');
    if (id == "addDivTextAndImage") {
      let img = document.getElementById("imageUpload");
      img.removeAttribute('src');

      var btnUpload = document.getElementById("btnUploadTextAndImage");
      btnUpload.removeAttribute("disabled");

      var btn = document.getElementById("addPostTextAndImage");
      btn.setAttribute("disabled", "");
    }
    if (id == "addDivTextAndMultipleImages") {
      let arrimg = document.getElementsByClassName("imageUploadTextAndMultipleImages");
      let divImgs=document.getElementById("TextAndMultipleImagesDiv")

      var btnUpload = document.getElementById("btnUploadTextAndImage");
      btnUpload.removeAttribute("disabled");
      divImgs.innerHTML=""

    }
  }


  showAddPost=function(id){
    let sure=document.getElementById(id);
    sure.classList.add("show");
    sure.classList.remove('none');
    this.cancelAddPost("addDiv");

  }

  addPostDef = function () {
    let txtTitle=((document.getElementById("addText") as HTMLInputElement).value);
    let txtTxt=((document.getElementById("addTextarea") as HTMLInputElement).value);
    console.log(txtTitle, txtTxt);
    
    this.cancelAddPost("addDivText");
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
  
  postVisible=function(input){
    console.log(input);
    let sure=document.getElementById('vis'+input);
    if(sure.classList.contains("true")){
      sure.classList.add("false")
      sure.classList.remove("true")
    }else{
      sure.classList.add("true")
      sure.classList.remove("false")      
    }
    console.log(this.pageOrder);
    this.websiteService.editvisibilityPost(this.pageOrder,input);
  }

  onFileChanged(event) {
    var btnUpload = document.getElementById("btnUploadTextAndImage");
    btnUpload.setAttribute("disabled", "");
    let  uploadedImageBlob: Blob;

    var btn = document.getElementById("addPostTextAndImage");
    btn.setAttribute("disabled", "");
    let img = document.getElementById("imageUpload");
    let selectedFile: File;
    selectedFile = event.target.files[0];
    console.log("orig: " + selectedFile);

    this.ng2ImgMax.resizeImage(selectedFile, 1280, 10000).subscribe(
      result => {
        console.log("resize blob?: " + result);
        uploadedImageBlob = result;

        var reader = new FileReader();
        reader.onload = function (e: any) {
          img.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(uploadedImageBlob);
        btn.removeAttribute("disabled");
      },
      error => {
        console.log('resizeError', error);
      });

    var reader = new FileReader();
    reader.onload = function (e: any) {
      img.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(uploadedImageBlob);

    img.classList.add("show")
    img.classList.remove("none")

  }

  addPostTextAndImageDef = function () {
    let txtTitle=((document.getElementById("addText1") as HTMLInputElement).value);
    let txtTxt=((document.getElementById("addTextarea1") as HTMLInputElement).value);
    let img = (document.getElementById("imageUpload") as HTMLImageElement).src;
    let arrImg=[img];
    console.log(txtTitle+txtTxt);
    
    this.cancelAddPost("addDivTextAndImage");
    this.websiteService.addPostWithImage(txtTitle, txtTxt, arrImg, this.pageOrder)
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
  onFileChangedMultipleImages(event) {
    var btnUpload = document.getElementById("btnUploadTextAndMultipleImages");
    btnUpload.setAttribute("disabled", "");
    let  uploadedImageBlob: Blob;
    let ImgDiv=document.getElementById("TextAndMultipleImagesDiv")
    var btn = document.getElementById("addPostTextAndMultipleImages");
    btn.setAttribute("disabled", "");
    // let img = document.getElementById("imageUpload");
    let arrImages=[];

    for (let i = 0; i < event.target.files.length; i++) {

      let selectedFile: File;
      selectedFile = event.target.files[i];
          this.ng2ImgMax.resizeImage(selectedFile, 1280, 10000).subscribe(
      result => {
        console.log("resize blob?: " + result);
        uploadedImageBlob = result;

        var reader = new FileReader();
        reader.onload = function (e: any) {
          // img.setAttribute('src', e.target.result);
          let newImg=document.createElement("img");
          newImg.classList.add("imageUploadTextAndMultipleImages")
          newImg.style.height="160px";
          newImg.style.width="auto";
          newImg.style.margin="0 10px 0 10px";
          newImg.style.borderRadius="6px";
          
          newImg.setAttribute("src",e.target.result);
          ImgDiv.appendChild(newImg);
          arrImages.push(e.target.result);

        }
        reader.readAsDataURL(uploadedImageBlob);
        if(i==event.target.files.length-1){
          btn.removeAttribute("disabled");
        }
      },
      error => {
        console.log('resizeError', error);
      });
    }
  }

  addPostTextAndMultipleImagesDef = function () {
    let txtTitle=((document.getElementById("addText2") as HTMLInputElement).value);
    let txtTxt=((document.getElementById("addTextarea2") as HTMLInputElement).value);
    let img = document.getElementsByClassName("imageUploadTextAndMultipleImages");
    let arrImages=[];
    for(let i = 0; i<img.length;i++){
      arrImages.push((img[i]as HTMLImageElement).src);
    }
    
    console.log(txtTitle+txtTxt);
    
    this.cancelAddPost("addDivTextAndMultipleImages");
    this.websiteService.addPostWithImage(txtTitle, txtTxt, arrImages, this.pageOrder)
      .subscribe(website => {
        // console.log(website);
        this.ownWebsite = website;
        for (let page of this.ownWebsite.pages) {
          if (page.pageOrder == this.pageOrder) {
            this.page = page;
        }
      }
    });
    document.getElementById("addText2").setAttribute("value","");
    document.getElementById("addText2").innerHTML="";
    (document.getElementById("addText2") as HTMLInputElement).value="";
    (document.getElementById("addTextarea2") as HTMLInputElement).value="";
    
    document.getElementById("addTextarea2").setAttribute("value","");
    }

}

