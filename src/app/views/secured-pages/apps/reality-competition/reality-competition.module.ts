import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RealityCompetitionRoutingModule } from './reality-competition-routing.module';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { BracketComponent } from './bracket/bracket.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    DashboardComponent,
    BracketComponent
  ],
  imports: [
    CommonModule,
    RealityCompetitionRoutingModule,
    AngularMaterialModule,
    BsDropdownModule.forRoot()
  ]
})
export class RealityCompetitionModule {
}
