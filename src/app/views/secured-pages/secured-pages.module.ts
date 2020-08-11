import { NgModule } from '@angular/core';
import { AutoTrackerModule } from './apps/auto-tracker/auto-tracker.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudModule } from './apps/crud/crud.module';
import { SiteAdminModule } from './site-admin/site-admin.module';
import { TestPagesModule } from './test-pages/test-pages.module';
import {AngularMaterialModule} from '@tqp/modules/angular-material.module';


@NgModule({
  declarations: [],
  imports: [
    // Custom Modules
    AutoTrackerModule,
    CrudModule,
    SiteAdminModule,
    TestPagesModule,
    // Other Imports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ]
})
export class SecuredPagesModule {
}
