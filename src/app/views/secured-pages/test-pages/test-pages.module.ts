import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test-component/test.component';
import { TestPagesRoutingModule } from './test-pages-routing.module';
import { BasicDatabaseConnectionComponent } from './basic-database-connection/basic-database-connection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProgressComponent } from './progress/progress.component';
import { DndDirective } from './test-component/dnd.directive';


@NgModule({
  declarations: [
    TestComponent,
    BasicDatabaseConnectionComponent,
    ProgressComponent,
    DndDirective
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    FlexLayoutModule,
    TestPagesRoutingModule
  ]
})
export class TestPagesModule {
}
