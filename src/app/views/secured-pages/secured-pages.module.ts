import { NgModule } from '@angular/core';
import { AutoTrackerModule } from './apps/auto-tracker/auto-tracker.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudModule } from './apps/crud/crud.module';
import { TestPagesModule } from './test-pages/test-pages.module';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [],
  imports: [
    // Custom Modules
    AutoTrackerModule,
    CrudModule,
    AccountModule,
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
