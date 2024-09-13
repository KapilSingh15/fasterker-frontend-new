import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarModule } from "@solidexpert/ng-sidebar";
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from "ngx-bootstrap/modal";
import { SkyBreadcrumbComponent } from './components/sky-breadcrumb/sky-breadcrumb.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from "ngx-pagination";
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { CalendarModule } from 'primeng/calendar';
import { CalenderComponent } from './components/calender/calender.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    SkyBreadcrumbComponent,
    SearchComponentComponent,
    SkeletonLoaderComponent,
    CalenderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule.forRoot(),
    NgxChartsModule,
    NgSelectModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    CalendarModule
    ],
  exports : [
    SidebarModule,
    NgxChartsModule,
    NgSelectModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    ToastrModule,
    ModalModule,
    TabsModule,
    NgxPaginationModule,
    SearchComponentComponent,
    FormsModule,
    SkyBreadcrumbComponent,
    BsDatepickerModule,
    SkeletonLoaderComponent,
    CalendarModule,
    CalenderComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
