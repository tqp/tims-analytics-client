import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test-component/test.component';
import { TestPagesRoutingModule } from './test-pages-routing.module';
import { BasicDatabaseConnectionComponent } from './basic-database-connection/basic-database-connection.component';


@NgModule({
  declarations: [
    TestComponent,
    BasicDatabaseConnectionComponent
  ],
  imports: [
    CommonModule,
    TestPagesRoutingModule
  ]
})
export class TestPagesModule {
}
