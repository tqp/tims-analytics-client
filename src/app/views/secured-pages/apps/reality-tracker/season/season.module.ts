import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonDetailComponent } from './season-detail/season-detail.component';
import { SeasonDetailEditComponent } from './season-detail-edit/season-detail-edit.component';
import { SeasonCreateDialogComponent } from './season-create-dialog/season-create-dialog.component';
import { AngularMaterialModule } from '../../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CrudDetailEditDialogComponent } from '../../crud/crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { CrudPersonFriendEditDialogComponent } from '../../crud/crud-person-friend-edit-dialog/crud-person-friend-edit-dialog.component';



@NgModule({
  declarations: [
    SeasonListComponent,
    SeasonDetailComponent,
    SeasonDetailEditComponent,
    SeasonCreateDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SeasonCreateDialogComponent
  ]
})
export class SeasonModule { }
