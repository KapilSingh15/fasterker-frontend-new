import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryManageRoutingModule } from './history-manage-routing.module';
import { HistoryManageComponent } from './pages/history-manage/history-manage.component';
import { HisoryFilterComponent } from './component/hisory-filter/hisory-filter.component';
import { HistoryVehicleOnMapComponent } from './component/history-vehicle-on-map/history-vehicle-on-map.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    HistoryManageComponent,
    HisoryFilterComponent,
    HistoryVehicleOnMapComponent
  ],
  imports: [
    CommonModule,
    HistoryManageRoutingModule,
    SharedModule
  ]
})
export class HistoryManageModule { }
