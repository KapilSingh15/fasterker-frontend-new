import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BreadcrumbItems } from '../../../../../../../shared/interfaces/breadcrumb-items';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CreateVehicleMasterComponent } from '../create-vehicle-master/create-vehicle-master.component';
import { VehicleMasterService } from '../../services/vehicle-master.service';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
@Component({
  selector: 'vehicle-master-list',
  templateUrl: './vehicle-master-list.component.html',
  styleUrl: './vehicle-master-list.component.scss'
})
export class VehicleMasterListComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/admin/admin-home/admin-dashboard",
      active: false,
    },

    {
      name: "Vehicle Master",
      path: "",
      active: true,
    },
  ];
  
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`
  };
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Search By`
  };
  bsModalRef!: BsModalRef
  totlRecords: any;
  vehicleList:any
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
  searchText:any
  options =  [
    {
      "id": "CompanyName",
      "description": "Company Name"
    },
    {
      "id": "UserName",
      "description": "User Name"
    },
    {
      "id": "VehicleType",
      "description": "Vehicle Type"
    },
    {
      "id": "VehicleNo",
      "description": "Vehicle No"
    },
    {
      "id": "EngineNo",
      "description": "Engine No"
    }
  ]

  selectsearch = [
    {
      "id": "1",
      "description": "Active"
    },
    {
      "id": "0",
      "description": "Inactive"
    }
  ]
  userDetail: any;



  constructor(
    private modalService: BsModalService,
    private vehicleMasterService:VehicleMasterService,
    private refreshService:RefreshPageService,
    private notificationService:NotificationService,
    private storageService: StorageService,
  ) { }
  ngOnInit() {
    this.setInitialtable()
    this.tableProperty()
    this.getVehicleMasterList({})
    this.getuserDetail()
    this.refreshService.customerAdded$.subscribe(() => {
      this.getVehicleMasterList({})
    });
  }
  
// for table property Method here
  tableProperty(){
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


  // for delete Vehicle 
  deleteResourceGroup(VehicleId: any) {
    let payload = {
        "DeletedBy" : this.userDetail?.UserName,
    }
    this.notificationService.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this.vehicleMasterService.deleteVehicleMaster(VehicleId,payload).subscribe({
          next: (res:any) => {            
            Swal.fire({
              title: "Deleted!",
              text: res?.body?.result,
              icon: "success",
            });
            this.getVehicleMasterList({});
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

  // For Set Table Header
  setInitialtable() {
    this.columns = [
      { key: 'Company Name', title: 'Company Name' },
      { key: 'User Name', title: 'User Name' },
      { key: 'Vehicle Type', title: 'Vehicle Type' },
      { key: 'Vehicle No', title: 'Vehicle No' },
      { key: 'Manufacturing Year', title: 'Manufacturing Year' },
      { key: 'Maker', title: 'Maker' },
      { key: 'Engine No', title: 'Engine No' },
      { key: 'Chasis No', title: 'Chasis No' },
      { key: 'Model Name', title: 'Model Name' },
      { key: 'Fitness Expiry Date', title: 'Fitness Expiry Date' },
      { key: 'Action', title: 'Action' },

    ]
  }

  onAddVehicleMster(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateVehicleMasterComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
    
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {     
    })
  }

    // for Vehicle Matser List Api
    getVehicleMasterList({}) {
      this.vehicleMasterService?.vehicleMasterList(this.param).subscribe((res: any) => {
        this.vehicleList = res?.result?.data
        this.totlRecords = res?.result?.pagination?.totalResults || 0;
      })
    }

  /**
* table data change
*/
onTablePageChange(event: any) {
  this.param.page = event - 1;
  this.pageIndex = event;
};

/** For search by method */
onSearchBY(event: any): void {    
  const value = event?.value?.id;
  this.param.searchValue = "";
  this.searchText = "";
  // this.param.sortCode = "desc";
  //this.param.sortby = "";
  this.param.searchBy = event?.value?.id;
  if (value == undefined) {
    this.param.searchBy = "";
    this.pageIndex = 1;
    this.param.page = 0;
    // this.getResourceList();
  }
}

/** For search button Method here */
onSearcRole(inputValue: any): void {
  this.param.searchValue = inputValue ? inputValue.trim() : inputValue;
  this.searchText = this.param.searchValue;
 // this.param.sortCode = "desc";
  this.param.page = 0;
 // this.searchedFlag = true;
  this.pageIndex = 1;
  this.getVehicleMasterList({});
}

onSearchSelect(event: any) {
  const value = event?.value?.id;

  if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {      
    this.param.status = '';
    this.getVehicleMasterList({});
  } else {
    this.param.status = value;
    this.param.page = 0;
    // this.searchedFlag = true;
     this.pageIndex = 1;
     this.getVehicleMasterList({});
  }
}


}
