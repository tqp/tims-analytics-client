import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserDetailEditComponent } from './user/user-detail-edit/user-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Account Management'
    },
    children: [
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      },
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'User List'
        }
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
        data: {
          title: 'User Profile'
        }
      },
      {
        path: 'user-detail-edit/:id',
        component: UserDetailEditComponent,
        data: {
          title: 'User Detail Edit'
        }
      },
      {
        path: 'my-profile',
        component: UserProfileComponent,
        data: {
          title: 'My Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
