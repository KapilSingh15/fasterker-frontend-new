import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { ResourceMasterService } from '../../../resourse-master/services/resource-master.service';
import { ResourceGroupService } from '../../services/resource-group.service';

@Component({
  selector: 'app-resource-group-create',
  templateUrl: './resource-group-create.component.html',
  styleUrl: './resource-group-create.component.scss'
})
export class ResourceGroupCreateComponent {
  @Output() mapdata = new EventEmitter()
  resourceGroupForm!:FormGroup
  userDetail: any;
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
  editData: any;


  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private notificationService:NotificationService,
    private storageService: StorageService,
    private resourceGroupService: ResourceGroupService
  ) {}

  ngOnInit() {
    console.log(this.editData);
    
    this.setInitialForm()
    this.getuserDetail()
  }
  /*For Form Control*/
  setInitialForm() {
    if (this.editData) {
      const statusData = this.editData?.IsActive == true ? {
        "value": 1,
        "text": "Active"
      }
      : {
        "value": 0,
        "text": "InActive"
      } 
      this.resourceGroupForm = this.fb.group({
        resourceGroupName: [this.editData?.ResourceGroupName, [Validators.required]],
        orderNumber: [this.editData?.OrderNumber, [Validators.required, Validators.pattern('^[0-9]*$')]],
        iconClass: [this.editData?.IconClass, [Validators.required]],
        url: [this.editData?.URL, [Validators.required]],
        viewOnMobile: [this.editData?.IsViewOnMobile == true ? '1' : '0', [Validators.required]],
        status: [statusData, [Validators.required]],
        description: [this.editData?.Description],
      })
    }else{
      this.resourceGroupForm = this.fb.group({
        resourceGroupName: ['', [Validators.required]],
        orderNumber: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
        iconClass: ['', [Validators.required]],
        url: ['', [Validators.required]],
        viewOnMobile: ['0', [Validators.required]],
        status: ['', [Validators.required]],
        description: [''],
      })
    }
   
  }

  // for checkbox select
  onCheckboxChange(value: string) {
    this.resourceGroupForm.get('viewOnMobile')?.setValue(value);
  }
  
  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value      
    })
  }

  /*For Create Resource Group*/
  submit(formValue: any) {
    let payload:any = {
      "ResourceGroupName": formValue?.resourceGroupName,
      "Description": formValue?.description,
      "OrderNumber": Number(formValue?.orderNumber),
      "URL": formValue?.url,
      "IconClass":formValue?.iconClass,
      "IsViewOnMobile": Number(formValue?.viewOnMobile),
      "IsActive": Number(formValue?.status?.value),
      "CreatedBy": this.userDetail?.UserName
    }
    let service: any;
    if (!this.editData?.pk_ResourceGroupId) {
      service = this.resourceGroupService.createResourceGroup(payload);
    } else {
      delete payload['CreatedBy'];
      payload['UpdatedBy'] = this.userDetail?.UserName;
      service = this.resourceGroupService?.updateResourceGroup(
        this.editData?.pk_ResourceGroupId,
        payload
      );
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
