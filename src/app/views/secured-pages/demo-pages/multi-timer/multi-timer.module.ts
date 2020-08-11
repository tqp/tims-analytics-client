import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiTimerComponent } from './multi-timer.component';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';



@NgModule({
  declarations: [
    MultiTimerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class MultiTimerModule { }
