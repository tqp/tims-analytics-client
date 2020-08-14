import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { SeriesDetailEditComponent } from './series-detail-edit/series-detail-edit.component';
import { AngularMaterialModule } from '../../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailComponent,
    SeriesDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SeriesModule { }
