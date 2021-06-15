import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderDevelopmentRoutingModule } from './under-development-routing.module';
import { DndDirective } from './aws-s3/dnd.directive';
import { ProgressComponent } from './progress/progress.component';
import { TestComponent } from './aws-s3/test.component';
import { AngularMaterialModule } from '../../../@tqp/modules/angular-material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DndDirective,
    ProgressComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    // Routing
    UnderDevelopmentRoutingModule
  ]
})
export class UnderDevelopmentModule { }
