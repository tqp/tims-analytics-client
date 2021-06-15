import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoTrackerModule } from './auto-tracker/auto-tracker.module';
import { CharterSauceModule } from './charter-sauce/charter-sauce.module';
import { DonorDatabaseModule } from './donor-database/donor-database.module';
import { RealityCompetitionModule } from './reality-competition/reality-competition.module';
import { RealityTrackerModule } from './reality-tracker/reality-tracker.module';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Apps'
    },
    children: [
      {
        path: '',
        redirectTo: 'auto-tracker',
        pathMatch: 'full'
      },
      {
        path: 'auto-tracker',
        component: AutoTrackerModule,
        data: {
          title: 'Auto Tracker'
        }
      },
      {
        path: 'charter-sauce',
        component: CharterSauceModule,
        data: {
          title: 'Charter Sauce'
        }
      },
      {
        path: 'donor-database',
        component: DonorDatabaseModule,
        data: {
          title: 'Donor Database'
        }
      },
      {
        path: 'reality-competition',
        component: RealityCompetitionModule,
        data: {
          title: 'Reality Competition'
        }
      },
      {
        path: 'reality-tracker',
        component: RealityTrackerModule,
        data: {
          title: 'Reality Tracker'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoPagesRoutingModule {
}
