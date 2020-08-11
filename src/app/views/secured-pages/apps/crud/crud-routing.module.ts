import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudMasterClientScrollComponent } from './crud-master-client-scroll/crud-master-client-scroll.component';
import { CrudMasterInfiniteScrollComponent } from './crud-master-infinite-scroll/crud-master-infinite-scroll.component';
import { CrudMasterServerPaginationComponent } from './crud-master-server-pagination/crud-master-server-pagination.component';
import { CrudDetailComponent } from './crud-detail/crud-detail.component';
import { CrudDetailEditPageComponent } from './crud-detail-edit-page/crud-detail-edit-page.component';
import { CrudPersonFriendEditPageComponent } from './crud-person-friend-edit-page/crud-person-friend-edit-page.component';
import { CrudPersonFriendEditDialogComponent } from './crud-person-friend-edit-dialog/crud-person-friend-edit-dialog.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Crud App'
    },
    children: [
      {
        path: '',
        redirectTo: 'crud-master-infinite-scroll',
        pathMatch: 'full'
      },
      {
        path: 'crud-master-client-scroll',
        component: CrudMasterClientScrollComponent,
        data: {
          title: 'Person List (Client-Side Scroll)'
        }
      },
      {
        path: 'crud-master-infinite-scroll',
        component: CrudMasterInfiniteScrollComponent,
        data: {
          title: 'Person List (Server-Side Infinite Scroll)'
        }
      },
      {
        path: 'crud-master-server-pagination',
        component: CrudMasterServerPaginationComponent,
        data: {
          title: 'Person List (Server-Side Pagination)'
        }
      },
      {
        path: 'crud-detail/:guid',
        component: CrudDetailComponent,
        data: {
          title: 'Person Detail'
        }
      },
      {
        path: 'crud-detail-edit-page/:guid',
        component: CrudDetailEditPageComponent,
        data: {
          title: 'Edit Person'
        }
      },
      {
        path: 'crud-detail-create-page',
        component: CrudDetailEditPageComponent,
        data: {
          title: 'Create New Person'
        }
      },
      {
        path: 'crud-person-friend-edit-page/:guid',
        component: CrudPersonFriendEditPageComponent,
        data: {
          title: 'Person-Friend Edit Page'
        }
      },
      {
        path: 'crud-person-friend-edit-dialog',
        component: CrudPersonFriendEditDialogComponent,
        data: {
          title: 'Person-Friend Edit Dialog'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule {
}
