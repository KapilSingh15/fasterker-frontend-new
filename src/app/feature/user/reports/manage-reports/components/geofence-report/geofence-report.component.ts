import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { BreadcrumbItems } from '../../../../../shared/interfaces/breadcrumb-items';

@Component({
  selector: 'app-geofence-report',
  templateUrl: './geofence-report.component.html',
  styleUrl: './geofence-report.component.scss'
})
export class GeofenceReportComponent {
  isLoading: boolean = true
  geofenceForm!: FormGroup
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/user/home/dashboard",
      active: false,
    },

    {
      name: "Geofence Report",
      path: "",
      active: true,
    },
  ];
  searchText: any
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

  configGeofence = {
    displayKey: 'description',
    search: true,
    placeholder: `Select Geofence`,
  };
  geofenceReportList: any
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

  geofenceDropdown = [
    {
      id: '1',
      description: 'skylabs Solution',
    },
  ];

  filterDay = [
    { id: 1, description: 'Today' },
    { id: 2, description: 'Yesterday' },
    { id: 3, description: 'Weekly' },
    { id: 6, description: 'Custom' },
  ]
  customeDate: any;


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
    this.geofenceForm = this.fb.group({
      geofence: ['', [Validators.required]],
      group: ['', [Validators.required]],
      devices: ['', [Validators.required]],
      radius: ['', [Validators.required]],
      filterDay: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      // start_address: ['', [Validators.required]],
      // end_address: ['', [Validators.required]],

    })
  }

  confirm(event: any, type: any) {
    if (type == 'FromDate') {
      this.geofenceForm.controls['fromDate'].patchValue(event?.dateTime);
    } else if (type == 'ToDate') {
      this.geofenceForm.controls['toDate'].patchValue(event?.dateTime);
    }
  }

  onChangeDay(event: any) {
    this.customeDate = event?.value?.description
  }

  setInitialtable() {
    this.columns = [
      { key: 'Vehicle No.', title: 'Vehicle No.'},
      { key: 'Geofence Name', title: 'Geofence Name'},
      { key: 'In', title: 'In' },
      { key: 'Out', title: 'Out' },
      { key: 'Duration', title: 'Duration' },

    ]
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
