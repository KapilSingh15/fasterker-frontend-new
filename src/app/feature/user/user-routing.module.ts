import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren:()=> import("./home/home.module").then(
      (m) => m.HomeModule
    ),
  },
  {
    path: 'live',
    loadChildren:()=> import("./live-track/live-track.module").then(
      (m) => m.LiveTrackModule
    ),
  },
  {
    path: 'history',
    loadChildren:()=> import("./history-playback/history-playback.module").then(
      (m) => m.HistoryPlaybackModule
    ),
  },
  {
    path: 'reports',
    loadChildren:()=> import("./reports/reports.module").then(
      (m) => m.ReportsModule
    ),
  },  
  {
    path: 'manage',
    loadChildren:()=> import("./manage/manage.module").then(
      (m) => m.ManageModule
    ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
