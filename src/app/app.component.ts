import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'demo9';
  @ViewChild("#startList") startList:any;

  constructor() {

  }
  ngOnInit(): void {
   
    
  }

  ngAfterViewInit(): void {
    let body = <HTMLElement>document.querySelector('body');
    body.style.overflowY = 'scroll';
  }
 
  weather() {
    let frame = <HTMLElement>document.querySelector('iframe');
    let aaa = <HTMLElement>document.querySelector('#aaa');
    let bbb = getComputedStyle(aaa).opacity;
    if(  bbb == '0') {
      aaa.style.display = 'block';
      aaa.style.opacity = '0.9';
      setTimeout(function() {
        aaa.style.display = 'none';
       aaa.style.opacity = '0';
      }, 2000)
    }else if( bbb == '0.9'){
      aaa.style.opacity = '0';
      aaa.style.display = 'none';
      
    }
    
  }
 
}
