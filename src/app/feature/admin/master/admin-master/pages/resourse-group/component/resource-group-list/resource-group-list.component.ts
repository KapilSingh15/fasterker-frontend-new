import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ResourceGroupCreateComponent } from '../resource-group-create/resource-group-create.component';
import { ResourceGroupService } from '../../services/resource-group.service';
import { log } from 'console';
import { BreadcrumbItems } from '../../../../../../../shared/interfaces/breadcrumb-items';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'resource-group-list',
  templateUrl: './resource-group-list.component.html',
  styleUrl: './resource-group-list.component.scss'
})
export class ResourceGroupListComponent {
  isLoading : 
  boolean = true
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/admin/admin-home/admin-dashboard",
      active: false,
    },

    {
      name: "Resource Group",
      path: "",
      active: true,
    },
  ];
  searchText: any
  options = [
    {
      "id": "ResourceGroupName",
      "description": "Resource Group Name"
    }
  ]
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Search By`
  };
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`,
  };
  bsModalRef!: BsModalRef;
  resourceGroupList: any;
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
  userDetail: any;


  constructor(
    private modalService: BsModalService,
    private resourceGroupService: ResourceGroupService,
    private notificationService:NotificationService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.setInitialtable()
    this.getResourceGroupList({})
    this.tableProperty()
    this.getuserDetail()
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

  setInitialtable() {
    this.columns = [
      { key: 'Resource Group', title: 'Resource Group', width:'7%' },
      { key: 'Icon', title: 'Icon',width:'2%'},
      { key: 'URL', title: 'URL' },
      { key: 'View On Mobile', title: 'Mobile View', width:'3%' },
      { key: 'Description', title: 'Description' },
      { key: 'Status', title: 'Status', width:'3%' },
      { key: 'Action', title: 'Action', width:'3%' },

    ]
  }

   // for get user details from local database
   getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value      
    })
  }

  onAddResource(value:any) {
    const initialState: ModalOptions = {
      initialState: {
         editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      ResourceGroupCreateComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );

    this.bsModalRef?.content.mapdata.subscribe((val: any) => {
      this.getResourceGroupList({});
    })
  }

  // for Resource Group List Api
  getResourceGroupList({}) {
    this.isLoading = true
    this.resourceGroupService?.resourceGroupList(this.param).subscribe((res: any) => {
      this.resourceGroupList = res?.result?.data
      this.totlRecords = res?.result?.pagination?.totalResults || 0;
    setTimeout(() => {
      this.isLoading = false
    }, 600);
    })
  }

  deleteResourceGroup(resourceGroupId: any) {
    let payload = {
        "DeletedBy" : this.userDetail?.UserName,
    }
    this.notificationService.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this.resourceGroupService.deleteResourceGroup(resourceGroupId,payload).subscribe({
          next: (res:any) => {            
            Swal.fire({
              title: "Deleted!",
              text: res?.body?.result,
              icon: "success",
            });
            this.getResourceGroupList({});
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
    this.getResourceGroupList(event - 1);
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
      this.getResourceGroupList(0);
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
    this.getResourceGroupList(0);
  }

  onSearchSelect(event: any) {
    const value = event?.value?.id;
    if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {
      this.param.status = '';
      this.getResourceGroupList(0);
    } else {      
       this.param.status = value;
       this.param.page = 0;
       // this.searchedFlag = true;
        this.pageIndex = 1;
        this.getResourceGroupList(0);
    }
  }
}
