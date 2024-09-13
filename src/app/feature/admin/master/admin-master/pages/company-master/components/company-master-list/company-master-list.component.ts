import { Component } from '@angular/core';
import { BreadcrumbItems } from '../../../../../../../shared/interfaces/breadcrumb-items';
import { CompanyMasterService } from '../../services/company-master.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CreateCompanyMasterComponent } from '../create-company-master/create-company-master.component';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-master-list',
  templateUrl: './company-master-list.component.html',
  styleUrl: './company-master-list.component.scss',
})
export class CompanyMasterListComponent {
  isLoading : boolean =  true
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/admin/admin-home/admin-dashboard',
      active: false,
    },

    {
      name: 'Company Master',
      path: '',
      active: true,
    },
  ];
  config = {
    displayKey: 'description',
    search: true,
    placeholder: `Search By`,
  };
  companyListDetail: any;
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
      id: 'CompanyName',
      description: 'Company Name',
    },
    {
      id: 'MobileNo',
      description: 'Mobile No.',
    },
    {
      id: 'Email',
      description: 'Email',
    },
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
  userDetail: any;

  constructor(
    private companyMasterService: CompanyMasterService,
    private modalService: BsModalService,
    private refreshService:RefreshPageService,
    private storageService: StorageService,
    private notificationService:NotificationService,
  ) {}

  ngOnInit() {
    this.setInitialtable();
    this.getCompanyList({});
    this.tableProperty();
    this.getuserDetail()
    this.refreshService.customerAdded$.subscribe(() => {
      this.getCompanyList({});
    });
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

    // for Delete Company
  deleteCompanyMaster(companyId: any) {
    let payload = {
        "DeletedBy" : this.userDetail?.UserName,
    }
    this.notificationService.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this.companyMasterService.deleteCompany(companyId,payload).subscribe({
          next: (res:any) => {            
            Swal.fire({
              title: "Deleted!",
              text: res?.body?.result,
              icon: "success",
            });
            this.getCompanyList({});
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

  setInitialtable() {
    this.columns = [
      { key: 'Company Name', title: 'Company Name', width:"15%" },
      { key: 'Company Name', title: 'Parent Company',width:"10%" },
      { key: 'Mobile No.', title: 'Mobile No.' },
      { key: 'Email', title: 'Email' },
      { key: 'Country', title: 'Country', width:"5%" },
      { key: 'State', title: 'State' },
      { key: 'District', title: 'District' },
      { key: 'Postal Code', title: 'Postal Code' },
      { key: 'Address', title: 'Address' },
      { key: 'Created Date', title: 'Created Date', width:"3%" },
      { key: 'Status', title: 'Status', width:"3%" },
      { key: 'Action', title: 'Action', width:"3%" },
    ];
  }

  onAddCompanies(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateCompanyMasterComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getCompanyList({});
    });
  }

  getCompanyList({}) {
    this.isLoading = true;
    this.companyMasterService?.companyList(this.param).subscribe((res: any) => {
      this.companyListDetail = res?.result?.data;
      this.totlRecords = res?.result?.pagination?.totalResults || 0;
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
      this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
    this.param.page = event - 1;
    this.pageIndex = event;
    this.getCompanyList(event - 1);
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
      this.getCompanyList(0);
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
    this.getCompanyList(0);
  }

  onSearchSelect(event: any) {
    const value = event?.value?.id;

    if (!event.value || event.value == null || event.value.length === 0 || value == undefined) {
      this.param.status = '';
      this.getCompanyList({});
    } else {
      this.param.status = value;
      this.param.page = 0;
      // this.searchedFlag = true;
      this.pageIndex = 1;
      this.getCompanyList(0);
    }
  }
}
