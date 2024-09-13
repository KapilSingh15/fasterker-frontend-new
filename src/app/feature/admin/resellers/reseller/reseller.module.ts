import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResellerRoutingModule } from './reseller-routing.module';
import { ManagesResellerComponent } from './pages/manages-reseller/manages-reseller.component';
import { ResellerListComponent } from './component/reseller-list/reseller-list.component';
import { FilterResellerComponent } from './component/filter-reseller/filter-reseller.component';
import { CreateResellerComponent } from './component/create-reseller/create-reseller.component';


@NgModule({
  declarations: [
    ManagesResellerComponent,
    ResellerListComponent,
    FilterResellerComponent,
    CreateResellerComponent
  ],
  imports: [
    CommonModule,
    ResellerRoutingModule
  ]
})
export class ResellerModule { }
