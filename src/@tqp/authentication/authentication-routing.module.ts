import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileOrigComponent } from './user/user-profile-orig/user-profile-orig.component';
import { UserProfileNewComponent } from './user/user-profile/user-profile-new.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Account Management'
    },
    children: [
      {
        path: 'my-profile',
        component: UserProfileNewComponent,
        data: {
          title: 'My Profile'
        }
      },
      {
        path: 'my-profile-orig',
        component: UserProfileOrigComponent,
        data: {
          title: 'My Profile (Orig)'
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
