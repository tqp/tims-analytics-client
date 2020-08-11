import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/open-pages/error/404.component';
import { P500Component } from './views/open-pages/error/500.component';
import { LoginPageComponent } from './views/open-pages/login-page/login-page.component';
import { LogoutComponent } from './views/open-pages/logout/logout.component';
import { SecuredPageResolverService } from '@tqp/services/secured-page-resolver.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/secured-pages/about',
    pathMatch: 'full',
  },

  {
    path: 'login-page',
    component: LoginPageComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'auto-tracker',
        loadChildren: () => import('./views/secured-pages/apps/auto-tracker/auto-tracker.module').then(m => m.AutoTrackerModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'crud-app',
        loadChildren: () => import('./views/secured-pages/apps/crud/crud.module').then(m => m.CrudModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'demo-pages',
        loadChildren: () => import('./views/secured-pages/demo-pages/demo-pages.module').then(m => m.DemoPagesModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'secured-pages',
        loadChildren: () => import('./views/secured-pages/secured-pages.module').then(m => m.SecuredPagesModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'site-admin',
        loadChildren: () => import('./views/secured-pages/account/account.module').then(m => m.AccountModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'test-pages',
        loadChildren: () => import('./views/secured-pages/test-pages/test-pages.module').then(m => m.TestPagesModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      }
    ]
  },
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
