import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoTrackerDashboardComponent } from './auto-tracker-dashboard/auto-tracker-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { AutoTrackerRoutingModule } from './auto-tracker-routing.module';
import { FuelActivityListComponent } from './fuel-activity/fuel-activity-list/fuel-activity-list.component';
import { FuelActivityDetailComponent } from './fuel-activity/fuel-activity-detail/fuel-activity-detail.component';
import { FuelActivityDetailEditComponent } from './fuel-activity/fuel-activity-detail-edit/fuel-activity-detail-edit.component';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AutoTrackerDashboardComponent,
    FuelActivityListComponent,
    FuelActivityDetailComponent,
    FuelActivityDetailEditComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    // Custom Routing
    AutoTrackerRoutingModule,
  ]
})
export class AutoTrackerModule {
}
