import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoleMasterService } from '../../services/role-master.service';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { log } from 'console';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss'
})
export class RoleCreateComponent {
  @Output() mapdata = new EventEmitter()
  config = {
    displayKey: "text",
    search: true
  };
  createRoleForm!: FormGroup | any
  userDetail: any;
  companyDropdown: any;
  editData:any

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private roleMasterService:RoleMasterService,
    private notificationService:NotificationService,
    private storageService: StorageService,
    private commonService: CommonService,
    private refreshService : RefreshPageService
   ) { }

  ngOnInit() {
    this.setInitialForm()
    this.getuserDetail()
    this.getCompanyDropdown()
  }

  StatusDropdown = [
    {
      "value": 1,
      "text": "Active"
    },
    {
      "value": 0,
      "text": "InActive"
    },
  ];

  // get User detail from Local db
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value      
    })
  }

  /*For Form Control*/
  setInitialForm() {
    if(this.editData){
      const statusData = this.editData?.IsActive == true ? {
        "value": 1,
        "text": "Active"
      }
      : {
        "value": 0,
        "text": "InActive"
      } 
      this.createRoleForm = this.fb.group({
        companyName: ['', [Validators.required]],
        roleName: [this.editData?.RoleName, [Validators.required]],
        status: [statusData, [Validators.required]],
        description: [this.editData?.Description],
      })
    }else{
      this.createRoleForm = this.fb.group({
        companyName: ['', [Validators.required]],
        roleName: ['', [Validators.required]],
        status: ['', [Validators.required]],
        description: [''],
      })
    }
    
  }

    // for company dropdown api 
    getCompanyDropdown() {
      let newData: any[] = [];
      this.commonService?.companyDropdownList().subscribe((res: any) => {
        let data = res?.body?.result?.data;
        newData = data?.filter((val:any)=> val?.ParentCompanyId == 0 || val?.ParentCompanyId == null).map((val:any)=>({
          value: val?.pk_CompanyId,
          text: val?.CompanyName
        }))
        this.companyDropdown = newData;        
        if (this.editData && this.editData?.pk_RoleId) {
          const selectCompany = this.companyDropdown.find(
            (ele: any) => ele.value === this.editData?.fk_CompanyId
          );          
          this.createRoleForm.controls['companyName'].setValue(selectCompany);
        }
      });
    }

  // for add role api here
  submit(formValue: any) {
    let payload:any = {
      "RoleName": formValue?.roleName,
      "Description": formValue?.description,
      "fk_CompanyId": Number(formValue?.companyName?.value),
      "CreatedBy": this.userDetail?.UserName,
      "IsActive": Number(formValue?.status?.value),
    }
    let service:any = this.roleMasterService.addRole(payload)
    if(this.editData && this.editData.pk_RoleId) {
      delete payload['CreatedBy'];
      payload['UpdatedBy']= this.userDetail?.UserName;
      service = this.roleMasterService.updateRole(this.editData.pk_RoleId,payload)
    }

    service.subscribe((res:any)=>{
      if(res?.body?.status_code == 200){
        this.modalService.hide()
        this.mapdata.emit()
        this.notificationService.successAlert(res?.body?.result);
        this.refreshService.announceCustomerAdded();
      }else{
        this.notificationService.errorAlert(res?.error?.details[0]?.message)
      }
     
    })
  }

// for close modal
  cancel(){
    this.modalService.hide()
  }

}
