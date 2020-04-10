import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router'

import { HttpClient, HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.less']
})
export class ReadComponent implements OnInit {

  public reads: any;
  public id: any;
  

  constructor(public route: ActivatedRoute, public http:HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((value: any) => {
      
      this.id = value;
    
      
    })
    let api = `http://39.105.138.173:666/admin/article/index?category=${this.id.category}`;
    // let api = "http://a.itying.com/api/productlist";
    this.http.get(api).subscribe((respone: any) => {
      // console.log(api);
      
      // console.log(respone);
       this.reads = respone;
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let body = <HTMLElement>document.querySelector('body');
    body.style.overflowY = 'scroll';
  }

}
