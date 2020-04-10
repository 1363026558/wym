import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';


@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule
  ]
})
export class MessageModule { }
