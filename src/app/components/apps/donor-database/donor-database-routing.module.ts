import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniListComponent } from './alumni/alumni-list/alumni-list.component';
import { AlumniDetailComponent } from './alumni/alumni-detail/alumni-detail.component';
import { AlumniDetailEditComponent } from './alumni/alumni-detail-edit/alumni-detail-edit.component';
import { AlumniListDeletedComponent } from './alumni/alumni-list-deleted/alumni-list-deleted.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Donor Database'
    },
    children: [
      {
        path: '',
        redirectTo: 'alumni-list',
        pathMatch: 'full'
      },
      {
        path: 'alumni-create',
        component: AlumniDetailEditComponent,
        data: {
          title: 'Create Alumni Record'
        }
      },
      {
        path: 'alumni-list',
        component: AlumniListComponent,
        data: {
          title: 'Alumni List'
        }
      },
      {
        path: 'alumni-list-deleted',
        component: AlumniListDeletedComponent,
        data: {
          title: 'Deleted Alumni Records'
        }
      },
      {
        path: 'alumni-detail/:id',
        component: AlumniDetailComponent,
        data: {
          title: 'Alumni Detail'
        }
      },
      {
        path: 'alumni-detail-edit/:id',
        component: AlumniDetailEditComponent,
        data: {
          title: 'Edit Detail Edit'
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorDatabaseRoutingModule {
}
