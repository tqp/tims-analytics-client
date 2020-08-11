import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoTrackerDashboardComponent } from './auto-tracker-dashboard/auto-tracker-dashboard.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoTrackerRoutingModule {
}
