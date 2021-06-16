import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';



@NgModule({
  declarations: [UserRoleListComponent],
  imports: [
    CommonModule,
    // Routing
    UserRoleRoutingModule
  ]
})
export class UserRoleModule { }
