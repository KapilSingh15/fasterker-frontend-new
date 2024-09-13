import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { GeneralReportComponent } from './pages/general-report/general-report.component';
import { ReportManageFilterComponent } from './components/report-manage-filter/report-manage-filter.component';
import { ReportManageListComponent } from './components/report-manage-list/report-manage-list.component';


@NgModule({
  declarations: [
    GeneralReportComponent,
    ReportManageFilterComponent,
    ReportManageListComponent
  ],
  imports: [
    CommonModule,
    ManageReportsRoutingModule
  ]
})
export class ManageReportsModule { }
