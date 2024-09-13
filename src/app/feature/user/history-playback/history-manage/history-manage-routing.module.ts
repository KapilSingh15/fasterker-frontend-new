import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryManageComponent } from './pages/history-manage/history-manage.component';

const routes: Routes = [
 {
  path: 'play-back', component: HistoryManageComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryManageRoutingModule { }
