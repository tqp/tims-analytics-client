import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPagesRoutingModule } from './demo-pages-routing.module';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { AngularMaterialModule } from '../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudModule } from './crud-app/crud.module';
import { GeoHeatmapComponent } from './geo-heatmap/geo-heatmap.component';
import { InteractiveGlobeComponent } from './interactive-globe/interactive-globe.component';
import { MaterialTableComponent } from './material-table/material-table.component';
import { MultiTimerComponent } from './multi-timer/multi-timer.component';
import { MultiTimerEditDialogComponent } from './multi-timer-edit-dialog/multi-timer-edit-dialog.component';
import { ToastrPopupComponent } from './toastr-popup/toastr-popup.component';
import { DatabaseConnectionTestComponent } from './database-connection-test/database-connection-test.component';


@NgModule({
  declarations: [
    AutoCompleteComponent,
    GeoHeatmapComponent,
    InteractiveGlobeComponent,
    MaterialTableComponent,
    MultiTimerComponent,
    MultiTimerEditDialogComponent,
    ToastrPopupComponent,
    DatabaseConnectionTestComponent,
  ],
  imports: [
    CommonModule,
    // Additional Modules
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // Custom Modules
    CrudModule,
    // Routing
    DemoPagesRoutingModule
  ]
})
export class DemoPagesModule {
}
