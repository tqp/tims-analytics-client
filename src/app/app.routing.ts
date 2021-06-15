import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from '../@tqp/error-pages/404.component';
import { P500Component } from '../@tqp/error-pages/500.component';
import { SecuredPageResolverService } from '@tqp/authentication/services/secured-page-resolver.service';
import { TokenExchangeComponent } from '../@tqp/authentication/token-exchange/token-exchange.component';
import { LogoutComponent } from '../@tqp/authentication/logout/logout.component';
import { LoginComponent } from '../@tqp/authentication/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/about',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'token-exchange',
    component: TokenExchangeComponent
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
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('../@tqp/authentication/authentication.module').then(m => m.AuthenticationModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'account',
        loadChildren: () => import('../@tqp/authentication/authentication.module').then(m => m.AuthenticationModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'auto-tracker',
        loadChildren: () => import('./components/apps/auto-tracker/auto-tracker.module').then(m => m.AutoTrackerModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'donor-database',
        loadChildren: () => import('./components/apps/donor-database/donor-database.module').then(m => m.DonorDatabaseModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'crud-app',
        loadChildren: () => import('./components/demo-pages/crud-app/crud.module').then(m => m.CrudModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'demo-pages',
        loadChildren: () => import('./components/demo-pages/demo-pages.module').then(m => m.DemoPagesModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'reality-tracker',
        loadChildren: () => import('./components/apps/reality-tracker/reality-tracker.module').then(m => m.RealityTrackerModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'reality-competition',
        loadChildren: () => import('./components/apps/reality-competition/reality-competition.module').then(m => m.RealityCompetitionModule),
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
