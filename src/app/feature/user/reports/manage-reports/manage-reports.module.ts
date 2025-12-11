import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { GeneralReportComponent } from './pages/general-report/general-report.component';
import { TripReportsComponent } from './components/trip-reports/trip-reports.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'ngx-easy-table';
import { StoppageReportComponent } from './components/stoppage-report/stoppage-report.component';
import { IdleReportComponent } from './components/idle-report/idle-report.component';
import { DistanceReportComponent } from './components/distance-report/distance-report.component';
import { DurationReportComponent } from './components/duration-report/duration-report.component';
import { OverspeedReportComponent } from './components/overspeed-report/overspeed-report.component';
import { GeofenceReportComponent } from './components/geofence-report/geofence-report.component';
import { AcReportComponent } from './components/ac-report/ac-report.component';
import { TemperatureReportComponent } from './components/temperature-report/temperature-report.component';


@NgModule({
  declarations: [
    GeneralReportComponent,
    TripReportsComponent,
    StoppageReportComponent,
    IdleReportComponent,
    DistanceReportComponent,
    DurationReportComponent,
    OverspeedReportComponent,
    GeofenceReportComponent,
    AcReportComponent,
    TemperatureReportComponent
  ],
  imports: [
    CommonModule,
    ManageReportsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    TableModule
  ]
})
export class ManageReportsModule { }
