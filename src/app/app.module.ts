
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import {RouterModule} from '@angular/router';




//请求数据
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReadComponent } from './components/read/read.component';
import { PerreadComponent } from './components/perread/perread.component';
import { HtmlpipePipe } from './pipes/htmlpipe.pipe';
import { SearchComponent } from './components/search/search.component';
import { SearchListComponent } from './components/search-list/search-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadComponent,
    PerreadComponent,
    HtmlpipePipe,
    SearchComponent,
    SearchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
