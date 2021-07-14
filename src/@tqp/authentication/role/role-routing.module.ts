import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleDetailEditComponent } from './role-detail-edit/role-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Roles'
    },
    children: [
      {
        path: '',
        redirectTo: 'role-list',
        pathMatch: 'full'
      },
      {
        path: 'role-create',
        component: RoleDetailEditComponent,
        data: {
          title: 'Create Role'
        }
      },
      {
        path: 'role-list',
        component: RoleListComponent,
        data: {
          title: 'Role List'
        }
      },
      {
        path: 'role-detail/:id',
        component: RoleDetailComponent,
        data: {
          title: 'Role Detail'
        }
      },
      {
        path: 'role-detail-edit/:id',
        component: RoleDetailEditComponent,
        data: {
          title: 'Role Detail Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}
