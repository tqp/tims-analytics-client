import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPagesRoutingModule } from './demo-pages-routing.module';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { GeoHeatmapComponent } from './geo-heatmap/geo-heatmap.component';
import { InteractiveGlobeComponent } from './interactive-globe/interactive-globe.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { MultiTimerComponent } from './multi-timer/multi-timer.component';
import { MultiTimerEditDialogComponent } from './multi-timer-edit-dialog/multi-timer-edit-dialog.component';
import { ToastrPopupComponent } from './toastr-popup/toastr-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialTableComponent } from './material-table/material-table.component';
import {AngularMaterialModule} from '@tqp/modules/angular-material.module';
import { AutoCompleteModule } from './auto-complete/auto-complete.module';
import { CountdownTimerModule } from './countdown-timer/countdown-timer.module';
import { GeoHeatmapModule } from './geo-heatmap/geo-heatmap.module';
import { InteractiveGlobeModule } from './interactive-globe/interactive-globe.module';
import { MaterialTableModule } from './material-table/material-table.module';
import { MultiTimerModule } from './multi-timer/multi-timer.module';
import { ToastrPopupModule } from './toastr-popup/toastr-popup.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DemoPagesRoutingModule,
    // Custom Module Imports
    AutoCompleteModule,
    CountdownTimerModule,
    GeoHeatmapModule,
    InteractiveGlobeModule,
    MaterialTableModule,
    MultiTimerModule,
    ToastrPopupModule
  ]
})
export class DemoPagesModule {
}
