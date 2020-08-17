import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoTrackerDashboardComponent } from './auto-tracker-dashboard/auto-tracker-dashboard.component';
import { FuelActivityListComponent } from './fuel-activity/fuel-activity-list/fuel-activity-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Auto Tracker'
    },
    children: [
      {
        path: '',
        redirectTo: 'auto-tracker',
        pathMatch: 'full'
      },
      {
        path: 'auto-tracker',
        component: AutoTrackerDashboardComponent,
        data: {
          title: 'Auto Tracker Dashboard'
        }
      },
      {
        path: 'fuel-activity-list',
        component: FuelActivityListComponent,
        data: {
          title: 'Fuel Activity'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoTrackerRoutingModule {
}
