import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDetailsRoutingModule } from './manage-details-routing.module';
import { MyDeviceComponent } from './pages/my-device/my-device.component';


@NgModule({
  declarations: [
    MyDeviceComponent
  ],
  imports: [
    CommonModule,
    ManageDetailsRoutingModule
  ]
})
export class ManageDetailsModule { }
