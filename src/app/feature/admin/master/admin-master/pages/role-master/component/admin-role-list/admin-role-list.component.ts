import { Component } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RoleCreateComponent } from '../role-create/role-create.component';
import Swal from 'sweetalert2';
import { RoleMasterService } from '../../services/role-master.service';
import { BreadcrumbItems } from '../../../../../../../shared/interfaces/breadcrumb-items';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';

@Component({
  selector: 'admin-role-list',
  templateUrl: './admin-role-list.component.html',
  styleUrl: './admin-role-list.component.scss',
})
export class AdminRoleListComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/admin/admin-home/admin-dashboard",
      active: false,
    },

    {
      name: "Role Master",
      path: "",
      active: true,
    },
  ];
  bsModalRef: any;
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Search By`
  };
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`
  };
  roleMasterList: any;
  totlRecords: any;
  public configuration!: Config;
  public columns!: Columns[];
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
  searchText:any

  options =  [
    {
      "id": "CompanyName",
      "description": "Company Name"
    },
    {
      "id": "RoleName",
      "description": "Role Name"
    }
  ];
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
    private roleMasterService: RoleMasterService,
    private notificationService:NotificationService,
    private storageService: StorageService,
    private refreshService : RefreshPageService

  ) {}

  ngOnInit() {
    this.setInitialtable();
    this.getRoleMasterList({});
    this.refreshService.customerAdded$.subscribe(() => {
      this.getRoleMasterList({});
    });
    this.getuserDetail()
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
  }

  setInitialtable() {
    this.columns = [
      { key: 'Company Name', title: 'Company Name', width:'10%' },
      { key: 'Role Name', title: 'Role Name', width:'10%' },
      { key: 'Descritpion', title: 'Descritpion', },
      { key: 'Status', title: 'Status', width:'3%' },
      { key: 'Action', title: 'Action', width:'3%' },
    ];
  }

    // get User detail from Local db
    getuserDetail() {
      this.storageService.getItem("userDetail").subscribe((value: any) => {
        this.userDetail = value      
      })
    }

  //**add roles */
  onAddRole(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      RoleCreateComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );

    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getRoleMasterList({});
    });
  }

  deleteRole(roleId: any) {
    let payload = {
        "DeletedBy" : this.userDetail?.UserName,
    }
    this.notificationService.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this.roleMasterService.deleteRole(roleId,payload).subscribe({
          next: (res:any) => {            
            Swal.fire({
              title: "Deleted!",
              text: res?.body?.result,
              icon: "success",
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
            });
            this.getRoleMasterList({});
          },
          error: (res:any) => {
            Swal.fire({
              title: "Error",
              text: "There was an error deleting the role.",
              icon: "error",
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
        });
      }
    });
  }
  isLoading  : boolean = true;
  // for Role Master List Api
  getRoleMasterList({}) {   
    this.isLoading= true; 
    this.roleMasterService?.roleMasterList(this.param).subscribe((res: any) => {
      (this.roleMasterList = res?.result?.data),
        (this.totlRecords = res.result?.pagination?.totalResults || 0);
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
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
    this.getRoleMasterList(event - 1);
  }

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
      this.getRoleMasterList(0);
    }
  }

   onSearcRole(inputValue: any): void {    
    this.param.searchValue = inputValue ? inputValue.trim() : inputValue;
    this.searchText = this.param.searchValue;
   // this.param.sortCode = "desc";
    this.param.page = 0;
   // this.searchedFlag = true;
    this.pageIndex = 1;
    this.getRoleMasterList(0);
  }

  onSearchSelect(event: any) {
    const value = event?.value?.id;

    if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {      
      this.param.status = '';
      this.getRoleMasterList({});
    } else {
      this.param.status = value;
      this.param.page = 0;
      // this.searchedFlag = true;
       this.pageIndex = 1;
       this.getRoleMasterList({});
    }
  }

  onUpdateRole(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      RoleCreateComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
    
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {     
    })
  }
}
