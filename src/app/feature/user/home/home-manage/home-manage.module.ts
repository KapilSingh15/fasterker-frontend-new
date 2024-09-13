import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManageRoutingModule } from './home-manage-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { VehicleStatusComponent } from './component/vehicle-status/vehicle-status.component';
import { VehicleMilageGraphComponent } from './component/vehicle-milage-graph/vehicle-milage-graph.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    VehicleStatusComponent,
    VehicleMilageGraphComponent
  ],
  imports: [
    CommonModule,
    HomeManageRoutingModule,
    SharedModule
  ]
})
export class HomeManageModule { }
