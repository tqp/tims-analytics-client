import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangeDialogComponent } from './user/password-change-dialog/password-change-dialog.component';
import { PasswordResetDialogComponent } from './user/password-reset-dialog/password-reset-dialog.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserDetailEditComponent } from './user/user-detail-edit/user-detail-edit.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { RoleDetailEditComponent } from './role/role-detail-edit/role-detail-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../components/toolkit/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LaddaModule } from 'angular2-ladda';
import { LogoutComponent } from './logout/logout.component';
import { TokenExchangeComponent } from './token-exchange/token-exchange.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserListComponent } from './user/user-list/user-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RoleDetailComponent,
    RoleDetailEditComponent,
    RoleListComponent,
    TokenExchangeComponent,
    PasswordChangeDialogComponent,
    PasswordResetDialogComponent,
    UserDetailComponent,
    UserDetailEditComponent,
    UserProfileComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    // Additional Modules
    AngularMaterialModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    LaddaModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    // Custom Modules
    // Routing
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule {
}
