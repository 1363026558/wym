import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router'



import { StorageService } from 'src/app/services/storage.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchs') search:ElementRef;
  public query_word:any;
  public searchList:Array<any> = [];

  constructor(public storage:StorageService, public http:HttpClient, public router:Router) { }

  ngOnInit(): void {
    
    if (this.storage.get('searchList')) {
      let str:any = this.storage.get('searchList');
      this.searchList = str;
      // console.log(str);
    }else {
      this.storage.set('searchList', this.searchList);
    }
    
   
    
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    let body = <HTMLElement>document.querySelector('body');
    body.style.overflowY = 'hidden';
  }

  delete_query() {
    this.query_word = "";
  }
  searchFor() {
   
    if (this.query_word) {
      let api = `http://39.105.138.173:666/admin/article/index?title=${this.query_word}`;
      this.http.post(api, this.query_word).subscribe((response:any) => {
        // console.log(response);
      })
      for (let item of this.searchList) {
        if(item == this.query_word) {
          this.storage.set('searchList', this.searchList);
          location.href = `searchlist?title=${this.query_word}`;
          this.query_word = "";
          
        }
        
      }
      if (this.query_word) {
        if(this.searchList.length > 10) {
          this.searchList.push(this.query_word);
          this.searchList.shift();
          this.storage.set('searchList', this.searchList);
          location.href = `searchlist?title=${this.query_word}`;
        }else {
          this.searchList.push(this.query_word);
          this.storage.set('searchList', this.searchList);
          location.href = `searchlist?title=${this.query_word}`;
        }
        
      }
      else {

      }
    }
    
  }
  delete(key:number) {
    this.searchList.splice(key, 1);
    this.storage.set('searchList', this.searchList);
  }

}
