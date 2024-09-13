import { Component } from '@angular/core';
import { DeviceService } from '../../service/device.service';
import { RefreshPageService } from '../../../../../shared/services/refresh-page.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateDeviceComponent } from '../create-device/create-device.component';
import { StorageService } from '../../../../../shared/services/storage.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'admin-device-list',
  templateUrl: './admin-device-list.component.html',
  styleUrl: './admin-device-list.component.scss'
})
export class AdminDeviceListComponent {
  // columns:any;
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number =
    this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  param = {
    searchBy: '',
    searchValue: '',
    status: '',
    limit: 10,
    page: 0,
  };
  data:any;
  deviceList: any;
  totlRecords: any;
  public configuration!: Config;
  public columns!: Columns[];
  config = {
    displayKey: "description",
    search: true,
    placeholder: 'Select '
  };

  options = [
    {
      id: 'CompanyName',
      description: 'Company Name',
    },
    {
      id: 'UserName',
      description: 'Username',
    },
    {
      id: 'VehicleNo',
      description: 'Vehicle No',
    },
    {
      id: 'VehicleType',
      description: 'Vehicle Type',
    },
    {
      id: 'DeviceType',
      description: 'Device Type',
    },
    {
      id:'DeviceIMEI',
      description : 'IMEI'
    }
  ];
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`,
  };
  selectsearch = [
    {
      id: '1',
      description: 'Active',
    },
    {
      id: '0',
      description: 'Inactive',
    },
  ];
  bsModalRef!: BsModalRef;
  isLoading : boolean =  false;
  searchText: any;
  userDetail: any;

  constructor(
    private deviceService : DeviceService,
    private refreshService: RefreshPageService,
    private modalService : BsModalService,
    private storageService: StorageService,
    private notificationService: NotificationService,


  ){}

  ngOnInit() {
    this.setInitialtable();
    this.getuserDetail()
    this.getDeviceList({});
    this.tableProperty();
    this.refreshService.customerAdded$.subscribe(() => {
      this.getDeviceList({});
    });
  }

  setInitialtable() {
    this.columns = [
      { key: 'Company', title: 'Company',width:"3%" },
      { key: 'username', title: 'Username',width:"3%" },
      { key: 'Vehicle No', title: 'Vehicle No',width:"4%" },
      { key: 'Vehicle Type', title: 'Vehicle Type',width:"2%" },
      { key: 'Model', title: 'Device Type',width:"2%" },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'SIM', title: 'SIM' },
      { key: 'Inst. Time', title: 'Inst. Date',width:"12%" },
      { key: 'Last Conn.', title: 'Last Conn.' },
      { key: 'Device Time', title: 'Device Time' },
      { key: 'Exp. Date', title: 'Exp. Date' },
      { key: 'description', title: 'Description' },
      { key: 'Status', title: 'Status',width: '2%' },
      { key: 'Action', title: 'Action',width: '2%' },
    ]
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

  
  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value
    })
  }

  getDeviceList({}) { 
    this.isLoading = true;
    this.deviceService?.customerDevice(this.param).subscribe((res: any) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);      
      this.deviceList = res?.result?.data;
      this.totlRecords = res?.result?.pagination?.totalResults || 0;
    });
  }

  onAddDevice(){
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateDeviceComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }

  onSearchBY(event: any): void {
    const value = event?.value?.id;
    this.param.searchValue = '';
    // this.searchText = '';
    // this.param.sortCode = "desc";
    //this.param.sortby = "";
    this.param.searchBy = event?.value?.id;
    if (value == undefined) {
      this.param.searchBy = '';
      this.pageIndex = 1;
      this.param.page = 0;
      this.getDeviceList(0);
    }
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
      this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
    this.param.page = event - 1;
    this.pageIndex = event;
    this.getDeviceList(event - 1);
  }

  
  /** For search button Method here */
  onSearcRole(inputValue: any): void {
    this.param.searchValue = inputValue ? inputValue.trim() : inputValue;
    this.searchText = this.param.searchValue;
    // this.param.sortCode = "desc";
    this.param.page = 0;
    // this.searchedFlag = true;
    this.pageIndex = 1;
    this.getDeviceList(0);
  }

  onSearchSelect(event: any) {
    const value = event?.value?.id;

    if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {
      this.param.status = '';
      this.getDeviceList({});
    } else {
      this.param.status = value;
      this.param.page = 0;
      // this.searchedFlag = true;
      this.pageIndex = 1;
      this.getDeviceList(0);
    }
  }

  onEditDevice(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateDeviceComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getDeviceList({});
    });
  }


  
  // for delete device 
  deleteDeviceData(VehicleId: any) {
    let payload = {
        "DeletedBy" : this.userDetail?.UserName,
    }
    this.notificationService.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this.deviceService.deleteDevice(VehicleId, payload).subscribe({
          next: (res:any) => {            
            Swal.fire({
              title: "Deleted!",
              text: res?.body?.result,
              icon: "success",
            });
            this.getDeviceList({});
          },
          error: (res:any) => {
            Swal.fire({
              title: "Error",
              text: "There was an error deleting the role.",
              icon: "error",
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
  }
}
