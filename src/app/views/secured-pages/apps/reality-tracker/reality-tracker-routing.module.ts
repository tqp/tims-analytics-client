import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesListComponent } from './series-list/series-list.component';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { ContestantDetailComponent } from './contestant-detail/contestant-detail.component';
import { ContestantDetailEditComponent } from './contestant-detail-edit/contestant-detail-edit.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { SeriesDetailEditComponent } from './series-detail-edit/series-detail-edit.component';

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

      // SERIES

      {
        path: 'series-list',
        component: SeriesListComponent,
        data: {
          title: 'Series List'
        }
      },
      {
        path: 'series-detail/:guid',
        component: SeriesDetailComponent,
        data: {
          title: 'Series Detail'
        }
      },
      {
        path: 'series-detail-edit/:guid',
        component: SeriesDetailEditComponent,
        data: {
          title: 'Edit Series'
        }
      },
      {
        path: 'series-create',
        component: SeriesDetailEditComponent,
        data: {
          title: 'Create Series'
        }
      },

      // CONTESTANT

      {
        path: 'contestant-list',
        component: ContestantListComponent,
        data: {
          title: 'Contestant List'
        }
      },
      {
        path: 'contestant-detail/:guid',
        component: ContestantDetailComponent,
        data: {
          title: 'Contestant Detail'
        }
      },
      {
        path: 'contestant-detail-edit/:guid',
        component: ContestantDetailEditComponent,
        data: {
          title: 'Edit Contestant'
        }
      },
      {
        path: 'contestant-create',
        component: ContestantDetailEditComponent,
        data: {
          title: 'Create Contestant'
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
