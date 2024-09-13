import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserMasterService } from '../../services/user-master.service';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';

@Component({
  selector: 'app-create-user-master',
  templateUrl: './create-user-master.component.html',
  styleUrl: './create-user-master.component.scss'
})
export class CreateUserMasterComponent {
  @Output() mapdata = new EventEmitter()
  config = {
    displayKey: "text",
    search: true
  };

  timeZone = [
    {
      "value": "UTC",
      "text": "UTC"
    },
    {
      "value": "IST",
      "text": "IST"
    },
    
  ];

  StatusDropdown = [
    {
      "value": 1,
      "text": "Active"
    },
    {
      "value": 0,
      "text": "In Active"
    },
  ];
  companyDropdown: any;
  userMasterForm!: FormGroup;
  roleDropdown: any;
  userDetail: any;
  editData:any

  constructor(
    private bsModelService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private userMasterService: UserMasterService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    
  ) { }

  ngOnInit() {
    console.log(this.editData);
    
    this.getCompanyDropdown()
    this.setInintialvalue()
    this.getRoleDropdown()
    this.getuserDetail()
  }

  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value      
    })
  }
  

  //**set initialvalue in form field */
  setInintialvalue() {
    if(this.editData && this.editData?.pk_UserId) {
      const tzData = this.timeZone.find(
        (ele: any) => ele.value === this.editData?.TimeZone
      );
      const statusData = this.editData?.IsActive == true ? {
        "value": 1,
        "text": "Active"
      }
      : {
        "value": 0,
        "text": "InActive"
      }
      this.userMasterForm = this.fb.group({
        companyName: ['', [Validators.required]],
        userName: [this.editData?.UserName, [Validators.required]],
        name: [this.editData?.Name, [Validators.required]],
        role: ['', [Validators.required]],
        mobile: [this.editData?.MobileNo, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: [this.editData?.EmailId, [Validators.required, Validators.email]],
        password: [this.editData?.Password, [Validators.required]],
        confirmPassword: [this.editData?.Password, [Validators.required]],
        timeZone: [tzData ],
        status: [statusData, [Validators.required]],
      })
    } else {
      this.userMasterForm = this.fb.group({
        companyName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        name: ['', [Validators.required]],
        role: ['', [Validators.required]],
        mobile: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: [null, [Validators.required]],
        timeZone: [''],
        status: [null, [Validators.required]],
      })
    }
  }

// for close modal
  close() {
    this.bsModelService.hide()
  }

// for Company dropdown here 
  getCompanyDropdown() {
    let newData: any[] = [];
    this.commonService?.companyDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data?.filter((val:any)=> val?.ParentCompanyId == 0).map((val:any)=>({
        value: val?.pk_CompanyId,
        text: val?.CompanyName
      }))
      this.companyDropdown = newData;
      if (this.editData && this.editData?.fk_CompanyId) {
        const selectCompany = this.companyDropdown.find(
          (ele: any) => ele.value === this.editData?.fk_CompanyId
        );
        this.userMasterForm.controls['companyName'].setValue(selectCompany);
      }
    });
  }

   // for role dropdown api 
   getRoleDropdown() {
    let newData: any
    this.commonService?.roleDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data
      this.roleDropdown = data.map((val: any) =>
        newData = {
          value: val?.pk_RoleId,
          text: val?.RoleName
        }
      )
      if (this.editData && this.editData?.fk_CompanyId) {
        const selectCompany = this.roleDropdown.find(
          (ele: any) => ele.value === this.editData?.fk_RoleId
        );
        this.userMasterForm.controls['role'].setValue(selectCompany);
      }
    })
  }

  //for create user master api
  submit(formValue: any) {
    let payload:any = {
      "UserName": formValue?.userName,
      "Name": formValue?.name,
      "EmailId": formValue?.email,
      "Password": formValue?.password,
      "MobileNo": formValue?.mobile,
      "Address": "",
      "Description": "",
      "fk_RoleId": Number(formValue?.role.value),
      "CreatedBy": this.userDetail?.UserName,
      "fk_CompanyId": Number(formValue?.companyName.value),
      "TimeZone": formValue?.timeZone?.value,
      "fk_ManagerId": 0,
      "IsActive" : Number(formValue?.status.value)

    }
    let service :any = this.userMasterService?.createUserMaster(payload);
    if(this.editData && this.editData?.pk_UserId) {
      delete payload['CreatedBy'];
      payload['UpdatedBy'] = this.userDetail?.UserName;
      service = this.userMasterService?.updateUser(
        this.editData?.pk_UserId,
        payload
      );
    }
    service.subscribe((res: any) => {
      if (res?.body?.status_code == 200) {
        this.bsModelService.hide()
        this.mapdata.emit()
        this.notificationService.successAlert(res?.body?.result)
      } else {
        this.notificationService.errorAlert(res?.error?.details[0]?.message)
      }

    })

  }

  cancel(){
    this.bsModelService.hide()
  }
}
