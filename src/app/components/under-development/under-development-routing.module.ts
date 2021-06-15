import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiTimerComponent } from '../demo-pages/multi-timer/multi-timer.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Under Development'
    },
    children: [
      {
        path: '',
        redirectTo: 'multi-timer',
        pathMatch: 'full'
      },
      {
        path: 'multi-timer',
        component: MultiTimerComponent,
        data: {
          title: 'Multi-Timer'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderDevelopmentRoutingModule {
}
