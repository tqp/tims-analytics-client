import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle/vehicle.component';
import { StationComponent } from './station/station.component';
import { FuelActivityComponent } from './fuel-activity/fuel-activity.component';
import { AutoTrackerDashboardComponent } from './auto-tracker-dashboard/auto-tracker-dashboard.component';
import { AutoExpenseComponent } from './auto-expense/auto-expense.component';
import { AutoExpenseCategoryComponent } from './auto-expense-category/auto-expense-category.component';
import { ChartsModule } from 'ng2-charts';
import { AutoTrackerRoutingModule } from './auto-tracker-routing.module';


@NgModule({
  declarations: [
    VehicleComponent,
    StationComponent,
    FuelActivityComponent,
    AutoTrackerDashboardComponent,
    AutoExpenseComponent,
    AutoExpenseCategoryComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    AutoTrackerRoutingModule
  ]
})
export class AutoTrackerModule {
}
