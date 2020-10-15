import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BracketComponent } from './bracket/bracket.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reality Competition'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Reality Competition Dashboard'
        }
      },
      {
        path: 'bracket/:guid',
        component: BracketComponent,
        data: {
          title: 'Reality Competition Bracket'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealityCompetitionRoutingModule {
}
