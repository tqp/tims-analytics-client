import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealityTrackerRoutingModule } from './reality-tracker-routing.module';
import { ContestantModule } from './contestant/contestant.module';
import { SeasonModule } from './season/season.module';
import { SeriesModule } from './series/series.module';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { PlayerDetailEditComponent } from './player/player-detail-edit/player-detail-edit.component';


@NgModule({
  declarations: [PlayerDetailComponent, PlayerDetailEditComponent],
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
