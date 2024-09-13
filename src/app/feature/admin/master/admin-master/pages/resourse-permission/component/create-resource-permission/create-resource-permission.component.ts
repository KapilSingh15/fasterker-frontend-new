import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { ResourcePermissionService } from '../../services/resource-permission.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { NotificationService } from '../../../../../../../shared/services/notification.service';


@Component({
  selector: 'app-create-resource-permission',
  templateUrl: './create-resource-permission.component.html',
  styleUrl: './create-resource-permission.component.scss',
})
export class CreateResourcePermissionComponent {
  config = {
    displayKey: 'text',
    search: true,
  };

  // resourceMasterList:any
  bsModalRef!: BsModalRef;
  totlRecords: any;
  public configuration!: Config;
  public columns!: Columns[];
  userDetail:any;
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
  roleDropdown: any;
  resourceMasterList: any;
  totalRecord: any;
  newSelectedResourece:any=[];
  selectRole:any
  roleId: any;
  selectedItem: any;
  newSelectedResoureceData: any;

  constructor(
    private bsModelService: BsModalService,
    private commonService: CommonService,
    private resourcePermissionService: ResourcePermissionService,
    private storageService : StorageService,
    private notificationService : NotificationService
  ) {}

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable();
    this.getRoleDropdown();
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
    // this.configuration.infiniteScroll = true;
    this.configuration.infiniteScrollThrottleTime = 10;
    this.configuration.rows = 10 
  }
  
   selectAll: boolean = false;
  setInitialtable() {
    this.columns = [
      // { key: '', title: 'select', width: '6%' },
      { key: 'Resource Name', title: 'Resource Name', width: '6%' },
      { key: 'Parent Resource', title: 'Parent Resource', width: '6%' },
      { key: 'Description', title: 'Description' },
      { key: 'Add', title: `Add`, width: '5%' },
      { key: 'Edit', title: 'Edit', width: '5%' },
      { key: 'View', title: 'View', width: '5%' },
      { key: 'Delete', title: 'Delete', width: '5%' },
      { key: 'Status', title: 'Status', width: '5%' },
    ];
  }

  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value         
    })
  }
  

  // for role dropdown api
  getRoleDropdown() {
    let newData: any;
    this.commonService?.roleDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      this.roleDropdown = data.map(
        (val: any) =>
          (newData = {
            value: val?.pk_RoleId,
            text: val?.RoleName,
          })
      );
      if (this.roleDropdown && this.roleDropdown?.length > 0) {
        const role: any = this.roleDropdown[0];
        this.roleId = role.value
        if (role) {
          this.selectRole = role
          this.getResourcePermission(role?.value);
        }
      }
    });
  }

  onChangeRole(event:any) {
    this.roleId = null;
    this.resourceMasterList = [];
    if(event && event.value) {
      this.roleId = event?.value.value;
      this.getResourcePermission(event?.value.value);
    } else {
      this.roleId = null;
      this.resourceMasterList = [];
    }
  }

  getResourcePermission(roleId: any) {    
    this.resourcePermissionService
      .resourceForPermission(roleId)
      .subscribe((res) => {
        this.resourceMasterList = res?.body?.result.data;
        this.selectAll = this.resourceMasterList.every((row: any) => row.selected);
        this.logSelectedRows();
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
    this.getResourcePermission(event - 1);
  }

  cancel() {
    this.bsModelService.hide();
  }
 
    
  logSelectedRows() {
    this.newSelectedResourece = this.resourceMasterList;     
    this.newSelectedResoureceData = this.newSelectedResourece.map((val: any) => {
      return {
        "fk_RoleId": this.roleId,
        "fk_ResourceId" : val.pk_ResourceId,
        "PermissionView": val?.PermissionView ? 1 : 0,
        "PermissionAdd": val?.PermissionAdd ? 1 : 0,
        "PermissionEdit": val?.PermissionEdit ? 1 : 0,
        "PermissionDelete": val?.PermissionDelete ? 1 : 0,
        "ExportData": 1,
        "Description": val?.Description,
        "IsDeleted": 0,
        "CreatedBy": this.userDetail?.UserName,
        "IsActive" : val?.IsActive
      };
    });
  
    console.log(this.newSelectedResoureceData);
  }

  changeValue(event: any, item: any, permission: string) {
    item[permission] = event.target.checked;

    
    console.log(item);
    
    this.logSelectedRows()
}
  
  tableEventEmitted(event: any): void {
    if (event.event === 'onSelectAll') {
      this.resourceMasterList.forEach((row : any) => row.selected = event.value);  
      this.selectAll = event.value; 
    }
  }


  submit() { 
    let payload = this.newSelectedResoureceData;
    this.resourcePermissionService.addPermission(payload).subscribe((res:any) => {
      this.bsModelService.hide()
      if (res?.body?.status_code == 200) {
        this.bsModelService.hide()
        this.notificationService.successAlert(res?.body?.result)
      } else {
        this.notificationService.errorAlert(res?.error?.details[0]?.message)
      }
    })



  }
  
}
