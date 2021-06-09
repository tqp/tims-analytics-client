import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorDatabaseRoutingModule } from './donor-database-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { AlumniListComponent } from './alumni/alumni-list/alumni-list.component';
import { AlumniDetailComponent } from './alumni/alumni-detail/alumni-detail.component';
import { AlumniDetailEditComponent } from './alumni/alumni-detail-edit/alumni-detail-edit.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlumniListDeletedComponent } from './alumni/alumni-list-deleted/alumni-list-deleted.component';
import { AlumniContactEditDialogComponent } from './alumni/alumni-contact-edit-dialog/alumni-contact-edit-dialog.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AlumniListComponent,
    AlumniDetailComponent,
    AlumniDetailEditComponent,
    AlumniListDeletedComponent,
    AlumniContactEditDialogComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // CUSTOM ADD-ONS
    AngularMaterialModule,
    DonorDatabaseRoutingModule
  ]
})
export class DonorDatabaseModule {
}
