import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    P404Component,
    P500Component
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ErrorPagesModule { }
