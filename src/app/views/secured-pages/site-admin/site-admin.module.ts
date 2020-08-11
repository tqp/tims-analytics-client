import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteAdminRoutingModule } from './site-admin-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    AboutComponent,
    MyProfileComponent,
    UserProfileComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    SiteAdminRoutingModule
  ]
})
export class SiteAdminModule {
}
