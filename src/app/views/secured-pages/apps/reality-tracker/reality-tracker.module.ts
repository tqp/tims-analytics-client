import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealityTrackerRoutingModule } from './reality-tracker-routing.module';
import { ContestantModule } from './contestant/contestant.module';
import { SeasonModule } from './season/season.module';
import { SeriesModule } from './series/series.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RealityTrackerRoutingModule,
    SeriesModule,
    SeasonModule,
    ContestantModule
  ]
})
export class RealityTrackerModule {
}
