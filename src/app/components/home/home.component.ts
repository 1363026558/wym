import { Component, OnInit, ViewChild} from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  @ViewChild('slide') slide:any;
  public bannerImg :any[] = [
    {
      src: '../../../assets/img/banner/fl01.png'
    },
    {
      src: '../../../assets/img/banner/1.jpg'
    },
    {
      src: '../../../assets/img/banner/2.jfif'
    },
    {
      src: '../../../assets/img/banner/3.jpg'
    },
    
    
  ];
  public logo:any[] = [
    './../../../assets/img/list/冠军.png',
    './../../../assets/img/list/亚军.png',
    './../../../assets/img/list/季军.png',
    './../../../assets/img/list/4.png',
    './../../../assets/img/list/5.png'
  ]
  public imgLength:number = this.bannerImg.length;
  public lastImg:string = this.bannerImg[0].src;
  public views:any;
  public good:any;
  public new:any;

  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    //热度最高
    let api = "http://39.105.138.173:666/admin/article/index?views=3";
    this.http.get(api).subscribe((respone: any) => {
       this.views = respone;
    })
//点赞最多
    api = "http://39.105.138.173:666/admin/article/index?good=3";
    this.http.get(api).subscribe((respone: any) => {
       this.good = respone;
    })

    //最新发布
    api = "http://39.105.138.173:666/admin/article/index?new=3";
    this.http.get(api).subscribe((respone: any) => {
       this.new = respone;
    })
  }
  ngAfterViewInit(): void {
    let body = <HTMLElement>document.querySelector('body');
    body.style.overflowY = 'scroll';

    let timerId = null;
    let currentIndex = 0;
    let oImg = document.querySelectorAll('.slides > li');
    let oWidth:number = parseFloat(getComputedStyle(oImg[0]).width);
    let length = oImg.length;
    let ul = <HTMLElement>document.querySelector('.slides');
    let obtn = document.querySelectorAll('ol > li');
    let oboxs = document.querySelector('.banner');
    let oLi = document.querySelector('.mycontent');
    console.log(oLi);

//     //tab
//     oLi[0].setAttribute('class', 'mycontent mycontent');

    obtn[0].setAttribute('class', 'li_active');
    // console.log(length);
    
    let id = setInterval(function () {
      
      slide();
      
    },2000)

    function slide() {
      currentIndex++;
      for(let j = 0; j < obtn.length; j++) {
        // 清除所有样式
        obtn[j].setAttribute('class', '')
      
    }
      if (currentIndex > length - 1) {
        currentIndex = 0;
        ul.style.marginLeft = - oWidth * currentIndex + 'px';
        currentIndex++;
        f(ul, - oWidth * currentIndex);
        obtn[currentIndex].setAttribute('class', 'li_active');
      }
        f(ul, - oWidth * currentIndex);
        if (currentIndex == length - 1) {
          obtn[0].setAttribute('class', 'li_active');
        }else {
          obtn[currentIndex].setAttribute('class', 'li_active');
        }
    }



    function f(ele:any, target:number) {
      clearInterval(timerId);
      timerId = setInterval(function () {
      let start:number = parseFloat(ele.style.marginLeft) || 0;
      let step:number = -(start - target) * 0.3;
      start += step;
      if (Math.abs(start - target) < Math.abs(step)) {
        clearInterval(timerId);
      }
      ele.style.marginLeft = start + 'px';
    },100)
  }

}

  changeShow(index: number) {
    let oLi:any = document.querySelectorAll('.mycontent');
    
    
    if (index>=0 && index<5) {
      for(let i = 0; i < 5; i++) {
        oLi[i].classList.remove('myactive');
      }
      oLi[index].classList.add('myactive');
    }else if(index>=5 && index<10) {
      for(let i = 5; i < 10; i++) {
        oLi[i].classList.remove('myactive');
      }
      oLi[index].classList.add('myactive');
    }else if(index>=10 && index<15) {
      for(let i = 10; i < 15; i++) {
        oLi[i].classList.remove('myactive');
      }
      oLi[index].classList.add('myactive');
      }
      
    }
    
    
    changetab(key: number) {
      let content:any = document.querySelectorAll('.tab_content');
      let tab:any = document.querySelectorAll('.tab > li');
      for(let i = 0; i < content.length; i++) {
        content[i].classList.remove('active');
       tab[i].classList.remove('li_active');
      }
      content[key - 1].classList.add('active');
      tab[key - 1].classList.add('li_active');
    }
  
}
