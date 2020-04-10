import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

import { HttpClient, HttpClientModule } from '@angular/common/http'

import { StorageService } from 'src/app/services/storage.service'

 

@Component({
  selector: 'app-perread',
  templateUrl: './perread.component.html',
  styleUrls: ['./perread.component.less']
})
export class PerreadComponent implements OnInit {
  @ViewChild('review') review:any;

  constructor(public storage:StorageService, public route: ActivatedRoute, public http:HttpClient) { }
  public id:any;
  public category:any;
  public reads:any;
  public goods:number;
  public reviews:string;
  public form:any = {
    articleId: "", 
    content: "",
    username: ""
  }
  public imgColor:boolean;
  public goodHistory:Array<any> = [];
  public goodId:number;
  public articleId:Array<any> = [];


  ngOnInit(): void {
    if(JSON.parse(this.storage.get('goodHistory')) == null) {
      this.articleId = [];
      this.goodHistory = [];
    }else {
      this.goodHistory = JSON.parse(this.storage.get('goodHistory'));
      this.articleId = JSON.parse(this.storage.get('goodHistory'));
         
    }
   
   

    this.route.params.subscribe((value: any) => {
      this.id = value;
    })
    this.route.queryParams.subscribe((param: any) => {
      // console.log(param);
      this.category = param.category;
    })
    let api = `http://39.105.138.173:666/admin/article/index?category=${this.category}&id=${this.id.id}`;
    this.http.get(api).subscribe((respone: any) => {
       this.reads = respone;
       this.goodId = respone.id;
       this.goods = respone.good;
       
       if(this.goodHistory.indexOf(this.goodId) == -1) {
        this.imgColor = false;
      
      }
      else if(this.goodHistory.indexOf(this.goodId) != -1) {
       
        this.imgColor = true;
      
      }else if(this.goodHistory == null) {
       
        this.imgColor = false;
        
      }
    })
//评论
    let api1 = `http://39.105.138.173:666/admin/article/reviews?id=${this.id.id}`;
    this.http.get(api1).subscribe((respone: any) => {
      this.reviews = respone;
   })

     

    
  }

  ngAfterViewInit(): void {
    let body = <HTMLElement>document.querySelector('body');
    let border = <HTMLElement>document.querySelector('#good');
    let goodnum = <HTMLElement>document.querySelector('#goodNum');
    body.style.overflowY = 'scroll';
    if(this.imgColor){
      border.style.border = "1px solid #1296db";
      goodnum.style.color = '#1296db';
    }
  }

  postView() {
    let msg = <HTMLElement>document.querySelector('.show_msg');
    if (this.form.content && this.form.username) {
     
     
      
      let api = 'http://39.105.138.173:666/admin/article/addreview'
      this.form.articleId = this.id.id
      let str = this.review.nativeElement.value.replace(/[\r\n]/g, "<br>");
      this.form.content  = str.replace(/\s/g,"&nbsp;");
      
      
      this.http.get(api, {  
        params: {  
            "articleId":this.form.articleId,
            "username": this.form.username,
            "content": this.form.content  
        }  
    }).subscribe((response: any) => {
        this.reviews = response;
      })
      this.form = {
        articleId: "",
        content: "",
        username: ""
      }
    }else {
      msg.style.display = 'block';
      setTimeout(function() {
        msg.style.display = 'none';
      }, 2000)
    }
  

    
  }

  good() {
    let border = <HTMLElement>document.querySelector('#good');
    let goodnum = <HTMLElement>document.querySelector('#goodNum');
    this.goodHistory = JSON.parse(this.storage.get('goodHistory'));

    
    
    if(this.goodHistory == null) {
      this.articleId = [];
      this.articleId.push(this.goodId);
      this.storage.set('goodHistory', JSON.stringify(this.articleId));
      let api1 = `http://39.105.138.173:666/admin/article/goods?id=${this.id.id}&&add=1`;
        this.http.get(api1).subscribe((respone: any) => {
          this.goods = respone;
        })
      this.imgColor = true;
      border.style.border = "1px solid #1296db";
      goodnum.style.color = '#1296db';
     
      
    }else {
      if(this.goodHistory.indexOf(this.goodId) == -1) {
        this.articleId.push(this.goodId);
        this.storage.set('goodHistory', JSON.stringify(this.articleId));
        let api1 = `http://39.105.138.173:666/admin/article/goods?id=${this.id.id}&&add=1`;
        this.http.get(api1).subscribe((respone: any) => {
          this.goods = respone;
        })
        this.imgColor = true;
        border.style.border = "1px solid #1296db";
        goodnum.style.color = '#1296db';
      }else if(this.goodHistory.indexOf(this.goodId) != -1) {
        let i = this.goodHistory.indexOf(this.goodId);
        this.articleId.splice(i,1);
        let api1 = `http://39.105.138.173:666/admin/article/goods?id=${this.id.id}&&add=-1`;
        this.http.get(api1).subscribe((respone: any) => {
          this.goods = respone;
        })
        this.storage.set('goodHistory', JSON.stringify(this.articleId));
        this.imgColor = false;
        border.style.border = "1px dashed #bfbfbf";
        goodnum.style.color = '#bfbfbf';
      }
  
    }
    





    
  
  }
}



