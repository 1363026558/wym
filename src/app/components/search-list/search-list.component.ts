import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.less']
})
export class SearchListComponent implements OnInit {
  public test:Array<any> = [1,5,3,7,6,9,10];
  public query_word:any;
  public mydate:Array<any>;

  constructor(public route:ActivatedRoute, public http:HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: any) => {
      
      this.query_word = param.title;
      })

      let api = `http://39.105.138.173:666/admin/article/index?title=${this.query_word}`;
      this.http.get(api).subscribe((response:any) => {
        
        this.mydate = response;
        console.log(this.mydate); 
    })

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let body = <HTMLElement>document.querySelector('body');
    body.style.overflowY = 'scroll';
  }

}
