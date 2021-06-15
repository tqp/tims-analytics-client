import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoTrackerModule } from './auto-tracker/auto-tracker.module';
import { CharterSauceModule } from './charter-sauce/charter-sauce.module';
import { DonorDatabaseModule } from './donor-database/donor-database.module';
import { RealityCompetitionModule } from './reality-competition/reality-competition.module';
import { RealityTrackerModule } from './reality-tracker/reality-tracker.module';
import { AboutModule } from '../main/about.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    // Custom Modules
    AboutModule,
    AutoTrackerModule,
    CharterSauceModule,
    DonorDatabaseModule,
    RealityCompetitionModule,
    RealityTrackerModule
  ]
})
export class AppsModule { }
