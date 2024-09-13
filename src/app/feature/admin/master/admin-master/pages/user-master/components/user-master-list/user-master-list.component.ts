import { Component } from '@angular/core';
import { UserMasterService } from '../../services/user-master.service';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';
import { BreadcrumbItems } from '../../../../../../../shared/interfaces/breadcrumb-items';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateUserMasterComponent } from '../create-user-master/create-user-master.component';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';

@Component({
  selector: 'app-user-master-list',
  templateUrl: './user-master-list.component.html',
  styleUrl: './user-master-list.component.scss'
})
export class UserMasterListComponent {
  isLoading : boolean = true;
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/admin/admin-home/admin-dashboard",
      active: false,
    },

    {
      name: "User Master",
      path: "",
      active: true,
    },
  ];
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Search By`
  };
  userMasterList: any;
  companyDropdown: any;
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
  bsModalRef!: BsModalRef
  searchText:any
  options =  [
    {
      "id": "UserName",
      "description": "User Name"
    },
    {
      "id": "CompanyName",
      "description": "Company Name"
    },
    {
      "id": "MobileNo",
      "description": "Mobile No."
    },
    {
      "id": "EmailId",
      "description": "Email"
    },
  ];
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`
  };
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
    private userMasterService:UserMasterService,
    private modalService: BsModalService,
    private storageService: StorageService,
    private notificationService:NotificationService,
  ) {}

  ngOnInit() {
    this.setInitialtable()
    this.getuserList({})
    this.tableProperty()
    this.getuserDetail()
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

  setInitialtable() {
    this.columns = [
      { key: 'Company Name', title: 'Company Name', width:"15%" },
      { key: 'Name', title: 'Name' },
      { key: 'User Name', title: 'User Name' },
      { key: 'Password', title: 'Password' },
      { key: 'Mobile No', title: 'Mobile No' },
      { key: 'Email', title: 'Email' },
      { key: 'Role', title: 'Role', width:"5%" },
      { key: 'TZ', title: 'TZ', width:"2%" },
      { key: 'Status', title: 'Status', width:"3%" },
      { key: 'Action', title: 'Action', width:"3%" },
    ]
  }

  // for get user master list api
  getuserList({}){
    this.isLoading = true
    this.userMasterService?.userMasterList(this.param).subscribe((res: any) => {
      this.userMasterList = res?.result?.data      
      this.totlRecords = res?.result?.pagination?.totalResults || 0;

      setTimeout(() => {
        this.isLoading= false
      }, 600);
    })
  }

  // For create Modal Open
  onAddUser(value:any) {   
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateUserMasterComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
    this.bsModalRef?.content.mapdata.subscribe((val: any) => {    
      this.getuserList({})
    })
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
  this.getuserList(event - 1);
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
    this.getuserList(0);
  }
}

/** For search button Method here */
onSearcRole(inputValue: any): void {
  this.isLoading= true
  this.userMasterList = []
  this.param.searchValue = inputValue ? inputValue.trim() : inputValue;
  this.searchText = this.param.searchValue;
 // this.param.sortCode = "desc";
  this.param.page = 0;
 // this.searchedFlag = true;
  this.pageIndex = 1;
  this.getuserList(0);
}

onSearchSelect(event: any) {
  const value = event?.value?.id;

  if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {
    this.param.status = '';
    this.getuserList(0);
  } else {
    this.param.status = value;
    this.param.page = 0;
    // this.searchedFlag = true;
     this.pageIndex = 1;
     this.getuserList(0);
  }
}

     // for get user details from local database
     getuserDetail() {
      this.storageService.getItem("userDetail").subscribe((value: any) => {
        this.userDetail = value      
      })
    }

    // for Delete user
  deleteUserMaster(userId: any) {
    let payload = {
        "DeletedBy" : this.userDetail?.UserName,
    }
    this.notificationService.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this.userMasterService.deleteUserMaster(userId,payload).subscribe({
          next: (res:any) => {            
            Swal.fire({
              title: "Deleted!",
              text: res?.body?.result,
              icon: "success",
            });
            this.getuserList({});
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
