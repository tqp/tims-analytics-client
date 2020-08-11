import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDatabaseConnectionComponent } from './basic-database-connection/basic-database-connection.component';
import { TestComponent } from './test-component/test.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Test Pages'
    },
    children: [
      {
        path: '',
        redirectTo: 'test',
        pathMatch: 'full'
      },
      {
        path: 'test',
        component: TestComponent,
        data: {
          title: 'Test Component'
        }
      },
      {
        path: 'basic-database-connection',
        component: BasicDatabaseConnectionComponent,
        data: {
          title: 'Database Connection Test'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestPagesRoutingModule {
}
