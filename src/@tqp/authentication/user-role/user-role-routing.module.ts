import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleDetailComponent } from './user-role-detail/user-role-detail.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Account Management'
    },
    children: [
      {
        path: '',
        redirectTo: 'user-role-list',
        pathMatch: 'full'
      },
      {
        path: 'user-role-list',
        component: UserRoleListComponent,
        data: {
          title: 'User-Role List'
        }
      },
      {
        path: 'user-role-detail/:id',
        component: UserRoleDetailComponent,
        data: {
          title: 'User-Role Detail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule {
}
