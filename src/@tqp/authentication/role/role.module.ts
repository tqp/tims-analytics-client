import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleDetailEditComponent } from './role-detail-edit/role-detail-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { LaddaModule } from 'angular2-ladda';
import { ListAddRemoveItemsBasicModule } from '../../components/toolkit/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleRoutingModule } from './role-routing.module';



@NgModule({
  declarations: [
    RoleDetailComponent,
    RoleDetailEditComponent,
    RoleListComponent,
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
    RoleRoutingModule
  ]
})
export class RoleModule { }
