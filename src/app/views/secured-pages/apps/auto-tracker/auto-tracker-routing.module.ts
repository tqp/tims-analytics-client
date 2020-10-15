import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoTrackerDashboardComponent } from './auto-tracker-dashboard/auto-tracker-dashboard.component';
import { FuelActivityListComponent } from './fuel-activity/fuel-activity-list/fuel-activity-list.component';
import { FuelActivityDetailEditComponent } from './fuel-activity/fuel-activity-detail-edit/fuel-activity-detail-edit.component';
import { FuelActivityDetailComponent } from './fuel-activity/fuel-activity-detail/fuel-activity-detail.component';
import { AutoExpenseListComponent } from './auto-expense/auto-expense-list/auto-expense-list.component';
import { AutoExpenseDetailComponent } from './auto-expense/auto-expense-detail/auto-expense-detail.component';
import { AutoExpenseDetailEditComponent } from './auto-expense/auto-expense-detail-edit/auto-expense-detail-edit.component';

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
        path: 'auto-expense-list',
        component: AutoExpenseListComponent,
        data: {
          title: 'Auto Expenses'
        }
      },
      {
        path: 'auto-expense-detail/:guid',
        component: AutoExpenseDetailComponent,
        data: {
          title: 'Auto Expense Detail'
        }
      },
      {
        path: 'auto-expense-detail-edit/:guid',
        component: AutoExpenseDetailEditComponent,
        data: {
          title: 'Edit Auto Expense'
        }
      },
      {
        path: 'auto-expense-create',
        component: AutoExpenseDetailEditComponent,
        data: {
          title: 'Create Auto Expense'
        }
      },
      {
        path: 'fuel-activity-list',
        component: FuelActivityListComponent,
        data: {
          title: 'Fuel Activity'
        }
      },
      {
        path: 'fuel-activity-detail/:guid',
        component: FuelActivityDetailComponent,
        data: {
          title: 'Fuel Activity Detail'
        }
      },
      {
        path: 'fuel-activity-detail-edit/:guid',
        component: FuelActivityDetailEditComponent,
        data: {
          title: 'Edit Fuel Activity'
        }
      },
      {
        path: 'fuel-activity-create',
        component: FuelActivityDetailEditComponent,
        data: {
          title: 'Create Fuel Activity'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoTrackerRoutingModule {
}
