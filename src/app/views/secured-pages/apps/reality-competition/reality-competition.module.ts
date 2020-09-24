import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RealityCompetitionRoutingModule } from './reality-competition-routing.module';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RealityCompetitionRoutingModule,
    AngularMaterialModule,
  ]
})
export class RealityCompetitionModule {
}
