import { Component } from '@angular/core';
import { ResourcePermissionService } from '../../services/resource-permission.service';
import { BreadcrumbItems } from '../../../../../../../shared/interfaces/breadcrumb-items';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CreateResourcePermissionComponent } from '../create-resource-permission/create-resource-permission.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'resource-permission-list',
  templateUrl: './resource-permission-list.component.html',
  styleUrl: './resource-permission-list.component.scss',
})
export class ResourcePermissionListComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/admin/admin-home/admin-dashboard',
      active: false,
    },

    {
      name: 'Resource Permission',
      path: '',
      active: true,
    },
  ];
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Search By`,
  };
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`,
  };

  resourcePermissionList: any;
  bsModalRef!: BsModalRef;
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
  searchText: any;
  options = [
    {
      id: 'RoleName',
      description: 'Role Name',
    },
    {
      id: 'ResourceName',
      description: 'Resource Name',
    },
  ];
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

  constructor(
    private resourcePermissionService: ResourcePermissionService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.setInitialtable();
    this.getResourcePermissionList({});
    this.tableProperty();
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
isLoading : boolean = false
  setInitialtable() {
    this.columns = [
      { key: 'Role Name', title: 'Role Name',width:"10%" },
      { key: 'Resource Name', title: 'Resource Name',width:"10%" },
      { key: 'Description', title: 'Description' },
      { key: 'Permission Add', title: `Add`, width:"3%" },
      { key: 'Permission Edit', title: 'Edit',width:"3%" },
      { key: 'Permission View', title: 'View',width:"3%" },
      { key: 'Permission Delete', title: 'Delete',width:"3%" },
      { key: 'Status', title: 'Status',width:"3%" },
      // { key: 'Action', title: 'Action',width:"5%" },
    ];
  }

  addResourcePermission() {
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateResourcePermissionComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
  }

  // for Resource Permission List Api
  getResourcePermissionList({}) {
    this.isLoading = true;
    this.resourcePermissionService
      ?.resourcePermissionList(this.param)
      .subscribe((res: any) => {
        this.resourcePermissionList = res?.result?.data;
        this.totlRecords = res?.result?.pagination?.totalResults || 0;

        setTimeout(() => {
          this.isLoading = false
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
      this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
    this.param.page = event - 1;
    this.pageIndex = event;
    this.getResourcePermissionList(event - 1);
  }

  /** For search by method */
  onSearchBY(event: any): void {
    const value = event?.value?.id;
    this.param.searchValue = '';
    this.searchText = '';
    // this.param.sortCode = "desc";
    //this.param.sortby = "";
    this.param.searchBy = event?.value?.id;
    if (value == undefined) {
      this.param.searchBy = '';
      this.pageIndex = 1;
      this.param.page = 0;
      this.getResourcePermissionList(0);
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
    this.getResourcePermissionList(0);
  }

  onSearchSelect(event: any) {
    const value = event?.value?.id;

    if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {
      this.param.status = '';
      this.getResourcePermissionList(0);
    } else {
      this.param.status = value;
      this.param.page = 0;
      // this.searchedFlag = true;
       this.pageIndex = 1;
       this.getResourcePermissionList(0);
    }
  }
}
