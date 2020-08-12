import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesListComponent } from './series-list/series-list.component';
import { ContestantListComponent } from './contestant-list/contestant-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reality Tracker'
    },
    children: [
      {
        path: '',
        redirectTo: 'series-list',
        pathMatch: 'full'
      },
      {
        path: 'series-list',
        component: SeriesListComponent,
        data: {
          title: 'Series List'
        }
      },
      {
        path: 'contestant-list',
        component: ContestantListComponent,
        data: {
          title: 'Contestant List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealityTrackerRoutingModule {
}
