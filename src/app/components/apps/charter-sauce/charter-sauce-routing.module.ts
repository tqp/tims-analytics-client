import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailEditComponent } from './person/person-detail-edit/person-detail-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'People'
    },
    children: [
      {
        path: '',
        redirectTo: 'person-list',
        pathMatch: 'full'
      },
      {
        path: 'person-create',
        component: PersonDetailEditComponent,
        data: {
          title: 'Create Person'
        }
      },
      {
        path: 'person-list',
        component: PersonListComponent,
        data: {
          title: 'Person List'
        }
      },
      {
        path: 'person-detail/:id',
        component: PersonDetailComponent,
        data: {
          title: 'Person Detail'
        }
      },
      {
        path: 'person-detail-edit/:id',
        component: PersonDetailEditComponent,
        data: {
          title: 'Person Detail Edit'
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharterSauceRoutingModule {
}
