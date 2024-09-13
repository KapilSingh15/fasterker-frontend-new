import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceMasterComponent } from './pages/device-master/device-master.component';

const routes: Routes = [
  {
    path :'admin-device-master', component: DeviceMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDeviceRoutingModule { }
