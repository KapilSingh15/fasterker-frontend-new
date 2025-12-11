import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { BreadcrumbItems } from '../../../../../shared/interfaces/breadcrumb-items';

@Component({
  selector: 'app-distance-report',
  templateUrl: './distance-report.component.html',
  styleUrl: './distance-report.component.scss'
})
export class DistanceReportComponent {
  isLoading: boolean = true
  distanceForm!: FormGroup
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/user/home/dashboard",
      active: false,
    },

    {
      name: "Distance Report",
      path: "",
      active: true,
    },
  ];
  options = [
    {
      "id": "1",
      "description": "Vehicle Group"
    }
  ]
  
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Filter By Vehicle Group`
  };

  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select Device`,
  };

  config2 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select default days`,
  };
  stopReportList: any
  totlRecords: any;
  public configuration!: Config;
  public columns!: Columns[];

  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number =
    this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  param = {
    searchBy: "",
    searchValue: "",
    status: "",
    limit: 10,
    page: 0,
  };
  deviceList = [
    {
      id: '1',
      description: 'HR26DG8383',
    },
    {
      id: '0',
      description: 'HR27DG6576',
    },
  ];

  filterDay = [
    { id: 1, description: 'Today' },
    { id: 2, description: 'Yesterday' },
    { id: 3, description: 'Weekly' },
    { id: 6, description: 'Custom' },
  ]
  customeDate: any;
  durationList:any


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setInitialtable()
    this.tableProperty()
    this.setInitialForm()
  }

  // for table property Method here
  tableProperty() {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
  }

  /*For Form Control*/
  setInitialForm() {
    this.distanceForm = this.fb.group({
      devices: ['', [Validators.required]],
      filterDay: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      // start_address: ['', [Validators.required]],
      // end_address: ['', [Validators.required]],

    })
  }

  confirm(event: any, type: any) {
    if (type == 'FromDate') {
      this.distanceForm.controls['fromDate'].patchValue(event?.dateTime);
    } else if (type == 'ToDate') {
      this.distanceForm.controls['toDate'].patchValue(event?.dateTime);
    }
  }

  onChangeDay(event: any) {
    this.customeDate = event?.value?.description
  }

    // setInitialtable(vehicle: any[]) {
    //   // Base columns
    //   this.columns = [
    //     { key: 'Vehicle No.', title: 'Vehicle No.' }
    //   ];
    //   if (vehicle.length > 0 ) {
    //     vehicle?.forEach((day: any) => {
    //       this.columns.push({ key: day.Date, title: new Date(day.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
    //     });
    //   }
    //       this.columns.push({ key: 'Total KM', title: 'Total KM' });
    // }

     setInitialtable() {
      // Base columns
      this.columns = [
        { key: 'Vehicle No.', title: 'Vehicle No.' },
        { key: 'Date', title: 'Date' },
        { key: 'Total KM', title: 'Total KM' }
      ];
    }
    


  /**
* table data change
*/
  onTablePageChange(event: any) {
    this.pageIndex = event;
    if (0 == event) {
      this.pageIndex = 1;
    }
    this.startValue =
      this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
    this.lastValue = this.startValue + this.tableItemsSize - 1;
    this.lastValue =
      this.lastValue > this.totlRecords
        ? this.totlRecords
        : this.lastValue;
    this.param.page = event - 1;
    this.pageIndex = event;
  };

  submit(formValue: any) {

  }
}

