import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudDetailComponent } from './crud-detail/crud-detail.component';
import { CrudDetailEditPageComponent } from './crud-detail-edit-page/crud-detail-edit-page.component';
import { CrudDetailEditDialogComponent } from './crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CrudPersonFriendEditDialogComponent } from './crud-person-friend-edit-dialog/crud-person-friend-edit-dialog.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CrudPersonFriendEditPageComponent } from './crud-person-friend-edit-page/crud-person-friend-edit-page.component';
import { CrudMasterClientScrollComponent } from './crud-master-client-scroll/crud-master-client-scroll.component';
import { CrudMasterServerPaginationComponent } from './crud-master-server-pagination/crud-master-server-pagination.component';
import { CrudRoutingModule } from './crud-routing.module';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/toolkit/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { CrudMasterServerScrollComponent } from './crud-master-server-scroll/crud-master-server-scroll.component';


@NgModule({
  declarations: [
    CrudMasterClientScrollComponent,
    CrudDetailComponent,
    CrudDetailEditPageComponent,
    CrudDetailEditDialogComponent,
    CrudPersonFriendEditDialogComponent,
    CrudPersonFriendEditPageComponent,
    CrudMasterServerPaginationComponent,
    CrudMasterServerScrollComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TextMaskModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    CrudRoutingModule,
    ListAddRemoveItemsBasicModule
  ],
  entryComponents: [
    CrudDetailEditDialogComponent,
    CrudPersonFriendEditDialogComponent
  ]
})
export class CrudModule {
}
