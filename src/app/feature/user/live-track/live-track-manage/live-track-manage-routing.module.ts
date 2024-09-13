import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveTrackComponent } from './pages/live-track/live-track.component';

const routes: Routes = [
  {
    path: 'live-track', component: LiveTrackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTrackManageRoutingModule { }
