import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { RealityTrackerRoutingModule } from './reality-tracker-routing.module';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { ContestantDetailComponent } from './contestant-detail/contestant-detail.component';
import { ContestantDetailEditComponent } from './contestant-detail-edit/contestant-detail-edit.component';


@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailComponent,
    ContestantListComponent,
    ContestantDetailComponent,
    ContestantDetailEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RealityTrackerRoutingModule
  ]
})
export class RealityTrackerModule {
}
