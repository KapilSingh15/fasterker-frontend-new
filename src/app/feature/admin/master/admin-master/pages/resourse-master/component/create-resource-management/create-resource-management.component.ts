import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { log } from 'console';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { ResourceMasterService } from '../../services/resource-master.service';

@Component({
  selector: 'app-create-resource-management',
  templateUrl: './create-resource-management.component.html',
  styleUrl: './create-resource-management.component.scss'
})
export class CreateResourceManagementComponent {
  @Output() mapdata = new EventEmitter()
  config = {
    displayKey: "text",
    search: true
  };
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
  editData:any;
  resourcedropdownList: any;
  createResourceForm!: FormGroup
  userDetail: any;
  parentResourceDropdown: any;

  constructor(
    private commonService: CommonService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private notificationService:NotificationService,
    private storageService: StorageService,
    private resourceMasterService: ResourceMasterService
  ) {

  }

  ngOnInit() {    
    this.resourceDropdown()
    this.setInitialForm()
    this.getuserDetail()
    this.getResourceDropdown()
    console.log("edit",this.editData);
    
  }
  /*For Form Control*/
  setInitialForm() {
    if(this.editData && this.editData?.pk_ResourceId) {
      const statusData = this.editData?.IsActive == true ? {
        "value": 1,
        "text": "Active"
      }
      : {
        "value": 0,
        "text": "InActive"
      } 
      this.createResourceForm = this.fb.group({
        resourceGroup: ['', [Validators.required]],
        parentResource: ['', [Validators.required]],
        resourceName: [this.editData?.ResourceName, [Validators.required]],
        orderNumber: [this.editData?.OrderNumber, [Validators.required]],
        iconClass: [this.editData?.IconClass, [Validators.required]],
        url: [this.editData?.URL, [Validators.required]],
        status: [statusData, [Validators.required]],
        viewOnMobile: [this.editData?.IsViewOnMobile == true ? '1' : '0', [Validators.required]],
        description: [this.editData?.Description, [Validators.required]],
      })
    } else {
      this.createResourceForm = this.fb.group({
        resourceGroup: ['', [Validators.required]],
        parentResource: ['', [Validators.required]],
        resourceName: ['', [Validators.required]],
        orderNumber: [null, [Validators.required]],
        iconClass: ['', [Validators.required]],
        url: ['', [Validators.required]],
        status: ['', [Validators.required]],
        viewOnMobile: ['0', [Validators.required]],
        description: ['', [Validators.required]],
      })
    }
  }

  // for checkbox select
  onCheckboxChange(value: string) {
    this.createResourceForm.get('viewOnMobile')?.setValue(value);
  }

  /*For resource Group Dropdown List*/
  resourceDropdown() {
    let newData: any[] = [];
    this.commonService.resourceGroupList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data?.map((val:any)=>({
        value: val?.pk_ResourceGroupId,
        text: val?.ResourceGroupName
      }))
      this.resourcedropdownList = newData
      if (this.editData && this.editData?.fk_ResourceGroupId) {
        const selectGroup = this.resourcedropdownList.find(
          (ele: any) => ele.value == this.editData?.fk_ResourceGroupId
        );
        this.createResourceForm.controls['resourceGroup'].setValue(selectGroup);
      }
    })
  }

  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value      
    })
  }

   /*For Parent Resource Here*/
   getResourceDropdown() {
    let newData: any[] = [];
    this.commonService?.parentResourceDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data?.filter((val:any)=> val?.ParentId == 0 || val?.ParentId == null).map((val:any)=>({
        value: val?.pk_ResourceId,
        text: val?.ResourceName
      }))
      this.parentResourceDropdown = newData;
      if (this.editData && this.editData?.pk_ResourceId) {
        const selectCompany = data.find(
          (ele: any) => ele.pk_ResourceId === this.editData?.ParentId
        );
        let selectPerent = {
          "value": selectCompany?.pk_ResourceId,
          "text": selectCompany?.ResourceName
        }
        if(!selectPerent || !(selectPerent?.value)) return
          
        this.createResourceForm.controls['parentResource'].setValue(selectPerent);
      }

    });
  }

  /*For Create Resource*/
  submit(formValue: any) {
    let payload:any = {
      "ResourceName": formValue?.resourceName,
      "fk_ResourceGroupId": Number(formValue?.resourceGroup?.value),
      "URL": formValue?.url,
      "ParentId": formValue?.parentResource?.value ?  Number(formValue?.parentResource?.value) : 0,
      "OrderNumber": Number(formValue?.orderNumber),
      "IconClass": formValue?.iconClass,
      "Description": formValue?.description,
      "IsViewOnMobile": Number(formValue?.viewOnMobile),
      "IsActive": Number(formValue?.status?.value),
      "CreatedBy": this.userDetail?.UserName,
    }
    let service: any;
    if (!this.editData?.pk_ResourceId) {
      service = this.resourceMasterService.createResource(payload);
    } else {
      delete payload['CreatedBy'];
      payload['UpdatedBy'] = this.userDetail?.UserName;
      service = this.resourceMasterService.updateResourceMaster(this.editData?.pk_ResourceId,payload)
    }
    service.subscribe((res: any) => {
      if (res?.body?.status_code == 200) {
        this.modalService.hide()
        this.mapdata.emit()
        this.notificationService.successAlert(res?.body?.result)
      } else {
        this.notificationService.errorAlert(res?.error?.details[0]?.message)
      }

    })
  }

  /* for Hide Modal */
  cancel() {
    this.modalService.hide()
  }
}
