import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListAddRemoveItemsBasicComponent} from './list-add-remove-items-basic.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';


@NgModule({
  declarations: [
    ListAddRemoveItemsBasicComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ListAddRemoveItemsBasicComponent
  ]
})
export class ListAddRemoveItemsBasicModule {
}
