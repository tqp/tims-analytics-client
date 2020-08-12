import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesListComponent } from './series-list/series-list.component';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { ContestantDetailComponent } from './contestant-detail/contestant-detail.component';
import { ContestantDetailEditComponent } from './contestant-detail-edit/contestant-detail-edit.component';
import { CrudDetailEditPageComponent } from '../crud/crud-detail-edit-page/crud-detail-edit-page.component';

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
      },
      {
        path: 'contestant-detail/:guid',
        component: ContestantDetailComponent,
        data: {
          title: 'Contestant Detail'
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
