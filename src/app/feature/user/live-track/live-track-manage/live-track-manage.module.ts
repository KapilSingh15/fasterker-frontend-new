import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTrackManageRoutingModule } from './live-track-manage-routing.module';
import { LiveTrackComponent } from './pages/live-track/live-track.component';
import { VehicleListComponent } from './component/vehicle-list/vehicle-list.component';
import { LiveVehicleMapComponent } from './component/live-vehicle-map/live-vehicle-map.component';


@NgModule({
  declarations: [
    LiveTrackComponent,
    VehicleListComponent,
    LiveVehicleMapComponent
  ],
  imports: [
    CommonModule,
    LiveTrackManageRoutingModule
  ]
})
export class LiveTrackManageModule { }
