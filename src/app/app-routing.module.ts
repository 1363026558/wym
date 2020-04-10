import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { ReadComponent } from './components/read/read.component';
import { PerreadComponent } from './components/perread/perread.component'
import { SearchComponent } from './components/search/search.component'
import { SearchListComponent } from './components/search-list/search-list.component'

import {  MessageModule } from './modules/message/message.module'


const routes: Routes = [
  {
    path: 'message',
    loadChildren: './modules/message/message.module#MessageModule'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  
  {
    path: 'read/:category',
    component:ReadComponent
  },
  {
    path: 'perread/:id',
    component:PerreadComponent
  },
  
  {
    path: 'search',
    component:SearchComponent
  },
  {
    path: 'searchlist',
    component:SearchListComponent
  },
  
  
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
