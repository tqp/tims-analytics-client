import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from './components/toolkit/confirm-dialog/confirm-dialog.module';
import { CountdownTimerModule } from './components/toolkit/countdown-timer/countdown-timer.module';
import { DurationModule } from './components/toolkit/duration/duration.module';
import { ListAddRemoveItemsBasicModule } from './components/toolkit/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { MillisecondsToDateStringModule } from './components/toolkit/milliseconds-to-date-string/milliseconds-to-date-string.module';
import { ErrorPagesModule } from './error-pages/error-pages.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    ConfirmDialogModule,
    CountdownTimerModule,
    DurationModule,
    ErrorPagesModule,
    ListAddRemoveItemsBasicModule,
    MillisecondsToDateStringModule
  ]
})
export class SharedModule {
}
