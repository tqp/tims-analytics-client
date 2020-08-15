import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerDetailEditComponent } from './player-detail-edit/player-detail-edit.component';
import { AngularMaterialModule } from '../../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PlayerDetailComponent,
    PlayerDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class PlayerModule {
}
