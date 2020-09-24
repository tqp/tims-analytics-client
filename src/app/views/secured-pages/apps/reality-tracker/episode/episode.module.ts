import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { EpisodeCreateDialogComponent } from './episode-create-dialog/episode-create-dialog.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { EpisodeDetailEditComponent } from './episode-detail-edit/episode-detail-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    EpisodeCreateDialogComponent,
    EpisodeDetailComponent,
    EpisodeDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    BsDatepickerModule.forRoot(),
  ],
  entryComponents: [
    EpisodeCreateDialogComponent
  ]
})
export class EpisodeModule {
}
