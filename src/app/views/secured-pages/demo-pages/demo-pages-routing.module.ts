import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoHeatmapComponent } from './geo-heatmap/geo-heatmap.component';
import { InteractiveGlobeComponent } from './interactive-globe/interactive-globe.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MultiTimerComponent } from './multi-timer/multi-timer.component';
import { ToastrPopupComponent } from './toastr-popup/toastr-popup.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Demo Pages'
    },
    children: [
      {
        path: '',
        redirectTo: 'geo-heatmap',
        pathMatch: 'full'
      },
      {
        path: 'geo-heatmap',
        component: GeoHeatmapComponent,
        data: {
          title: 'Geo-Heatmap'
        }
      },
      {
        path: 'interactive-globe',
        component: InteractiveGlobeComponent,
        data: {
          title: 'Interactive Globe'
        }
      },
      {
        path: 'auto-complete',
        component: AutoCompleteComponent,
        data: {
          title: 'Auto-Complete'
        }
      },
      {
        path: 'multi-timer',
        component: MultiTimerComponent,
        data: {
          title: 'Multi-Timer'
        }
      },
      {
        path: 'toastr-popup',
        component: ToastrPopupComponent,
        data: {
          title: 'Toastr Popup'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoPagesRoutingModule {
}
