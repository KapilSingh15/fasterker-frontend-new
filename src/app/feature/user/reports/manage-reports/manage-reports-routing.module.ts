import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralReportComponent } from './pages/general-report/general-report.component';

const routes: Routes = [
  {
    path: 'general-report', component: GeneralReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
