import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  @ViewChild('review') review:any;

  
  public reviews:string;
  public form:any = {
    content: "",
    username: ""
  }
  public msg:string;
  public remind:Array<any> = [
    {
      'nomsg': '未输入评论内容或用户名',
      'overmsg': '字数超过200的限制',
      'lessmsg': '字数少于3个字',
      'overuser': '用户名超过6个字符',
      'over': '超过字数限制'
    }
  ];

  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    let api = `http://39.105.138.173:666/admin/article/words`;
    this.http.get(api).subscribe((response: any) => {
      console.log(response);
      this.reviews = response;
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let body = <HTMLElement>document.querySelector('body');
    body.style.overflowY = 'scroll';
  }

  postView() {
    let msgDiv = <HTMLElement>document.querySelector('.show_msg');
    var result = this.form.content.replace(/[\r\n]/g, "").replace(/\s/g,"");
    var user = this.form.username.replace(/[\r\n]/g, "").replace(/\s/g,"");
    if (result.length != 0 && user.length != 0) {
      if(this.form.content.length > 200) {
        this.msg = this.remind[0].overmsg;
        msgDiv.style.display = 'block';
        setTimeout(function() {
          msgDiv.style.display = 'none';
        },2000)
      }else if(this.form.content.length < 3) {
        this.msg = this.remind[0].lessmsg;
        msgDiv.style.display = 'block';
        setTimeout(function() {
          msgDiv.style.display = 'none';
        },2000)
      }
      else if(this.form.username.length > 6) {
        this.msg = this.remind[0].overuser;
        msgDiv.style.display = 'block';
        setTimeout(function() {
          msgDiv.style.display = 'none';
        },2000)
      }else {
        let api = 'http://39.105.138.173:666/admin/article/addwords'
        let str = this.review.nativeElement.value.replace(/[\r\n]/g, "<br>");
        this.form.content  = str.replace(/\s/g,"&nbsp;");
        
        console.log(this.form);
        
        this.http.get(api, {  
          params: {  
              "username": this.form.username,
              "content": this.form.content  
          }  
      }).subscribe((response: any) => {
          this.reviews = response;
        })
        this.form = {
          content: "",
          username: ""
        }
      }
  
    }else {
      this.msg = this.remind[0].nomsg;
      msgDiv.style.display = 'block';
    setTimeout(function() {
      msgDiv.style.display = 'none';
    },2000)
    }
  

    
  }


  
}
