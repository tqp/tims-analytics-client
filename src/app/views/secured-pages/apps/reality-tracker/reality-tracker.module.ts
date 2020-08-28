import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealityTrackerRoutingModule } from './reality-tracker-routing.module';
import { ContestantModule } from './contestant/contestant.module';
import { SeasonModule } from './season/season.module';
import { SeriesModule } from './series/series.module';
import { PlayerModule } from './player/player.module';
import { EpisodeModule } from './episode/episode.module';
import { DashboardsModule } from './dashboards/dashboards.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RealityTrackerRoutingModule,
    SeriesModule,
    SeasonModule,
    ContestantModule,
    PlayerModule,
    EpisodeModule,
    DashboardsModule
  ]
})
export class RealityTrackerModule {
}
