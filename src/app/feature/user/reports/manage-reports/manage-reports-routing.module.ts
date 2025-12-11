import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralReportComponent } from './pages/general-report/general-report.component';
import { TripReportsComponent } from './components/trip-reports/trip-reports.component';
import { StoppageReportComponent } from './components/stoppage-report/stoppage-report.component';
import { IdleReportComponent } from './components/idle-report/idle-report.component';
import { DistanceReportComponent } from './components/distance-report/distance-report.component';
import { DurationReportComponent } from './components/duration-report/duration-report.component';
import { OverspeedReportComponent } from './components/overspeed-report/overspeed-report.component';
import { GeofenceReportComponent } from './components/geofence-report/geofence-report.component';
import { AcReportComponent } from './components/ac-report/ac-report.component';
import { TemperatureReportComponent } from './components/temperature-report/temperature-report.component';

const routes: Routes = [
  {
    path: 'general-report', component: GeneralReportComponent
  },
  {
    path: 'Trip', component: TripReportsComponent
  },
  {
    path: 'Stop', component: StoppageReportComponent
  },
  {
    path: 'IDLE', component: IdleReportComponent
  }, 
  {
    path: 'Distance', component: DistanceReportComponent
  },
  {
    path: 'Duration', component: DurationReportComponent
  },
  {
    path: 'Overspeed', component: OverspeedReportComponent
  },
  {
    path: 'Geofence', component: GeofenceReportComponent
  },
  {
    path: 'AC', component: AcReportComponent
  },
  {
    path: 'temperature', component: TemperatureReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
