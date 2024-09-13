import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSmsRoutingModule } from './admin-sms-routing.module';
import { SmsMasterComponent } from './pages/sms-master/sms-master.component';
import { SmsListComponent } from './component/sms-list/sms-list.component';
import { SmsFilterComponent } from './component/sms-filter/sms-filter.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    SmsMasterComponent,
    SmsListComponent,
    SmsFilterComponent
  ],
  imports: [
    CommonModule,
    AdminSmsRoutingModule,
    SharedModule
  ]
})
export class AdminSmsModule { }
