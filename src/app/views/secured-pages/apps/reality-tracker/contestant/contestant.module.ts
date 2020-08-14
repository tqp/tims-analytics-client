import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { ContestantDetailComponent } from './contestant-detail/contestant-detail.component';
import { ContestantDetailEditComponent } from './contestant-detail-edit/contestant-detail-edit.component';
import { AngularMaterialModule } from '../../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    ContestantListComponent,
    ContestantDetailComponent,
    ContestantDetailEditComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class ContestantModule {
}
