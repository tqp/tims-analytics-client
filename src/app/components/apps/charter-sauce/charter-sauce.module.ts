import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TqpListTemplateComponent } from '../../../../@tqp/components/templates/tqp-list-template/tqp-list-template.component';
import { TqpDetailTemplateComponent } from '../../../../@tqp/components/templates/tqp-detail-template/tqp-detail-template.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';
import { PersonDetailEditComponent } from './person/person-detail-edit/person-detail-edit.component';
import { CharterSauceRoutingModule } from './charter-sauce-routing.module';


@NgModule({
  declarations: [
    TqpListTemplateComponent,
    TqpDetailTemplateComponent,
    PersonListComponent,
    PersonDetailComponent,
    PersonDetailEditComponent
  ],
  imports: [
    CommonModule,
    CharterSauceRoutingModule
  ]
})
export class CharterSauceModule {
}
