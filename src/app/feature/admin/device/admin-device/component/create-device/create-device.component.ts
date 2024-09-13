import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { UserMasterService } from '../../../../master/admin-master/pages/user-master/services/user-master.service';
import { VehicleMasterService } from '../../../../master/admin-master/pages/vehicle-master/services/vehicle-master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { StorageService } from '../../../../../shared/services/storage.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { RefreshPageService } from '../../../../../shared/services/refresh-page.service';
import { DeviceService } from '../../service/device.service';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrl: './create-device.component.scss',
})
export class CreateDeviceComponent {
  config = {
    displayKey: 'text',
    search: true,
    placeholder: 'Select',
  };

  options = [
    {
      value: 1,
      text: 'Airtel',
    },
  ];
  StatusDropdown = [
    {
      value: 1,
      text: 'Active',
    },
    {
      value: 0,
      text: 'InActive',
    },
  ];
  timeZone = [
    {
      value: 'UTC',
      text: 'UTC',
    },
    {
      value: 'IST',
      text: 'IST',
    },
  ];
  companyDropdown: any;
  userMasterList: any;
  vehicleList: any;
  deviceTypeData: any;
  vehicleTypeData: any;
  customerDeviceForm!: FormGroup;
  userDetail: any;
  editData:any
  constructor(
    private commonService: CommonService,
    private userMasterService: UserMasterService,
    private vehicleMasterService: VehicleMasterService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private device: DeviceService,
    private modalService: BsModalService,
    private notificationService: NotificationService,
    private refreshService:RefreshPageService,
    private dateService: DateService
  ) {}

  ngOnInit() {    
    this.setInitialvalue();
    this.getuserDetail()
    this.getCompanyDropdown();
    this.deviceTypeList();
    this.vehicleTypeList();
  }

  setInitialvalue() {
    if(this.editData) {
      const statusData = this.editData?.IsActive == true ? {
        "value": 1,
        "text": "Active"
      }
      : {
        "value": 0,
        "text": "InActive"
      }
 
      const tzData = this.timeZone.find(
        (ele: any) => ele.value === this.editData?.TimeZone
      );
      const selectCompany = this.options.find(
        (ele: any) => ele.value === this.editData?.fk_SimOperator
      );
      this.customerDeviceForm = this.fb.group({
        companyId: [null, [Validators.required]],
        userId: [null, [Validators.required]],
        vehicleId: [null, [Validators.required]],
        deviceTypeId: [null, [Validators.required]],
        deviceIMEI: [this.editData?.DeviceIMEI, [Validators.required]],
        Device_UId: [this.editData?.Device_UId, [Validators.required]],
        simPhoneNumber: [this.editData?.SimPhoneNumber, [Validators.required]],
        simOperator: [selectCompany,[Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
        vehicleTypeId: [null, [Validators.required]],
        description: [this.editData?.Description, [Validators.required]],
        installation: [this.dateService.convertToUTC(this.editData?.InstallationOn), [Validators.required]],
        odometer: [this.editData?.Odometer, [Validators.required]],
        expiryDate: [this.dateService.convertToUTC(this.editData?.ExpiryDate), [Validators.required]],
        tz: [tzData, [Validators.required]],
        status: [statusData, [Validators.required]],
      });
    } else {
      this.customerDeviceForm = this.fb.group({
        companyId: [null, [Validators.required]],
        userId: [null, [Validators.required]],
        vehicleId: [null, [Validators.required]],
        deviceTypeId: [null, [Validators.required]],
        deviceIMEI: ['', [Validators.required]],
        Device_UId: ['', [Validators.required]],
        simPhoneNumber: ['', [Validators.required]],
        simOperator: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
        vehicleTypeId: [null, [Validators.required]],
        description: ['', [Validators.required]],
        installation: [new Date(), [Validators.required]],
        odometer: [null, [Validators.required]],
        expiryDate: [new Date(), [Validators.required]],
        tz: [null, [Validators.required]],
        status: [null, [Validators.required]],
      });
    }
  }

  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value
    })
  }

  // for company dropdown api
  getCompanyDropdown() {
    let newData: any[] = [];
    this.commonService?.companyDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data
        ?.filter(
          (val: any) =>
            val?.ParentCompanyId == 0 || val?.ParentCompanyId == null
        )
        .map((val: any) => ({
          value: val?.pk_CompanyId,
          text: val?.CompanyName,
        }));
      this.companyDropdown = newData;
      if ( this.companyDropdown) {
        this.customerDeviceForm.controls['companyId'].patchValue(this.companyDropdown[0]);
      }
      this.getuserList(this.companyDropdown[0].value);
      if (this.editData && this.editData?.fk_CompanyId) {
        const selectCompany = this.companyDropdown.find(
          (ele: any) => ele.value === this.editData?.fk_CompanyId
        );
        this.customerDeviceForm.controls['companyId'].setValue(selectCompany);
        this.getuserList(selectCompany.value);
      }
    });
  }

  //**get user list selection of company */
  onChangeComapny(event: any) {
    const value = event?.value?.value;
    if (
      !event.value ||
      event.value == null ||
      event.value.length === 0 ||
      value == undefined
    ) {
      this.getuserList('');
    } else {
      this.getuserList(value);
    }
  }

  //**get user dropdown here */
  getuserList(companyId: any) {
    let newData: any[] = [];
    this.userMasterService?.userMasterList({}).subscribe((res: any) => {
      let data = res?.result?.data;
      newData = data
        ?.filter((val: any) => val?.fk_CompanyId == companyId)
        .map((val: any) => ({
          value: val?.pk_UserId,
          text: val?.UserName,
        }));
      this.userMasterList = newData;
      if ( this.userMasterList) {
        this.customerDeviceForm.controls['userId'].patchValue(this.userMasterList[0]);
      }
      this.getVehicleMasterList(this.userMasterList[0].value);
      if (this.editData && this.editData?.fk_UserId) {
        const selectCompany = this.userMasterList.find(
          (ele: any) => ele.value === this.editData?.fk_UserId
        );
        this.customerDeviceForm.controls['userId'].setValue(selectCompany);
        this.getVehicleMasterList(selectCompany.value);
      }
    });
  }

  //**get vehicle data select on users */
  onChangeUser(event: any) {
    const value = event?.value?.value;
    if (
      !event.value ||
      event.value == null ||
      event.value.length === 0 ||
      value == undefined
    ) {
      this.getVehicleMasterList('');
    } else {
      this.getVehicleMasterList(value);
    }
  }

  //**get vehicle dropdown here */
  getVehicleMasterList(userId: any) {
    let newData: any[] = [];
    this.vehicleMasterService?.vehicleMasterList({}).subscribe((res: any) => {
      let data = res?.result?.data;
      newData = data
        ?.filter((val: any) => val?.fk_UserId == userId)
        .map((val: any) => ({
          value: val?.pk_VehicleId,
          text: val?.VehicleNo,
        }));
      this.vehicleList = newData;

      if (this.editData && this.editData?.fk_UserId) {
        const selectCompany = this.vehicleList.find(
          (ele: any) => ele.value === this.editData?.fk_VehicleId
        );
        this.customerDeviceForm.controls['vehicleId'].setValue(selectCompany);
      }
    });
  }

  //**device type list dropdown here */
  deviceTypeList() {
    let newData: any[] = [];
    this.commonService.deviceType().subscribe((res: any) => {
      let data = res?.body?.result.data;
      newData = data?.map((val: any) => ({
        value: val?.pk_DeviceTypeId,
        text: val?.DeviceType,
      }));
      this.deviceTypeData = newData;
      if (this.editData && this.editData?.fk_UserId) {
        const selectCompany = this.deviceTypeData.find(
          (ele: any) => ele.value === this.editData?.fk_DeviceTypeId
        );
        this.customerDeviceForm.controls['deviceTypeId'].setValue(selectCompany);
      }
    });
  }

  //**vehicle type dropdown here */
  vehicleTypeList() {
    let newData: any[] = [];
    this.commonService.vehicleType().subscribe((res: any) => {
      let data = res?.body?.result;
      newData = data?.map((val: any) => ({
        value: val?.pk_VehicleTypeId,
        text: val?.VehicleType,
      }));
      this.vehicleTypeData = newData;
      if (this.editData && this.editData?.fk_UserId) {
        const selectCompany = this.vehicleTypeData.find(
          (ele: any) => ele.value === this.editData?.fk_VehicleTypeId
        );
        this.customerDeviceForm.controls['vehicleTypeId'].setValue(selectCompany);
      }
    });
  }

  confirm(event: any) {
    console.log(event);
    this.customerDeviceForm.controls['installation'].patchValue(event?.dateTime);
  }

  expiryDateConfirm(event: any) {
    console.log(event);
    this.customerDeviceForm.controls['expiryDate'].patchValue(event?.dateTime);
  }

  submit(formvalue: any) {
    let payload:any = {
      fk_CompanyId: Number(formvalue?.companyId?.value),
      fk_UserId: formvalue?.userId?.value,
      fk_VehicleId: formvalue?.vehicleId?.value,
      fk_DeviceTypeId: formvalue?.deviceTypeId?.value,
      DeviceId: formvalue?.deviceIMEI,
      DeviceIMEI: formvalue?.deviceIMEI,
      Device_UId: formvalue?.Device_UId,
      SimPhoneNumber: formvalue?.simPhoneNumber,
      fk_SimOperator: formvalue?.simOperator?.value,
      fk_VehicleTypeId: formvalue?.vehicleTypeId?.value,
      VehicleNo: formvalue?.vehicleId?.text,
      Description: formvalue?.description,
      InstallationOn: formatDate(this.customerDeviceForm.get('installation')?.value, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      Odometer: parseFloat(formvalue.odometer),
      ExpiryDate: formatDate(this.customerDeviceForm.get('expiryDate')?.value, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      TimeZone: formvalue?.tz?.value,
      CreatedBy: this.userDetail?.UserName,
      IsActive: formvalue?.status?.value,
    };
    let service:any = this.device.addCustomerDevice(payload)
    if(this.editData && this.editData?.pk_Id) {
      delete payload['CreatedBy'];
      payload['UpdatedBy'] = this.userDetail?.UserName;
      service = this.device?.updateDevice(
        this.editData?.pk_Id,
        payload
      );
    }
    service.subscribe((res:any) => {      
      if (res?.body?.status_code == 200) {
        this.modalService.hide()
        this.refreshService.announceCustomerAdded();
        this.notificationService.successAlert(res?.body?.result)
      } else {
        this.notificationService.errorAlert(res?.error?.details[0]?.message)
      }
    })

  }

  close() {
    this.modalService.hide()
  }
}
