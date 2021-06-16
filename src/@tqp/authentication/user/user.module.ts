import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
import { UserProfileOrigComponent } from './user-profile-orig/user-profile-orig.component';
import { UserListComponent } from './user-list/user-list.component';
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component';
import { PasswordResetDialogComponent } from './password-reset-dialog/password-reset-dialog.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { LaddaModule } from 'angular2-ladda';
import { ListAddRemoveItemsBasicModule } from '../../components/toolkit/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileNewComponent } from './user-profile/user-profile-new.component';


@NgModule({
  declarations: [
    UserDetailComponent,
    UserDetailEditComponent,
    UserProfileOrigComponent,
    UserProfileNewComponent,
    UserListComponent,
    PasswordChangeDialogComponent,
    PasswordResetDialogComponent
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
    // Routing
    UserRoutingModule
  ]
})
export class UserModule {
}
