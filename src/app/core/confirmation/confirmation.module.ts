import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationRoutingModule } from './confirmation-routing.module';
import { ConfirmationComponent } from './confirmation.component';
import {NgbAlertModule, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule,
    ConfirmationRoutingModule,
    NgbAlertModule,
    NgbRatingModule
  ]
})
export class ConfirmationModule { }
