import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { formatDate } from '@angular/common';
import { VehicleMasterService } from '../../services/vehicle-master.service';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';
import { DateService } from '../../../../../../../shared/services/date.service';

@Component({
  selector: 'create-vehicle-master',
  templateUrl: './create-vehicle-master.component.html',
  styleUrl: './create-vehicle-master.component.scss',
})
export class CreateVehicleMasterComponent {
  config = {
    displayKey: 'text',
    search: true,
  };
  userDropdown: any;
  vehicleMasterForm!: FormGroup;
  userDetail: any;
  companyDropdown: any;
  vehicleTypeDropdown: any;
  editData: any;
  constructor(
    private bsModelService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private vehicleMasterService: VehicleMasterService,
    private refreshService: RefreshPageService,
    private cdr: ChangeDetectorRef,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.getCompanyDropdown();
    this.setInintialvalue();
    this.getuserDetail();
    this.getVehicletypeDropdown();
    console.log("editData",this.editData);
    
  }

  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem('userDetail').subscribe((value: any) => {
      this.userDetail = value;
    });
  }

  //**set initialvalue in form field */
  setInintialvalue() {
    if (this.editData) {
      this.vehicleMasterForm = this.fb.group({
        companyName: [null, [Validators.required]],
        user: [null, [Validators.required]],
        vehicleType: [null, [Validators.required]],
        mfgYear: [this.editData?.MfgYear, [Validators.required]],
        vehicleNo: [this.editData?.VehicleNo, [Validators.required]],
        maker: [this.editData?.VehicleMake, [Validators.required]],
        engineNo: [this.editData?.EngineNo, [Validators.required]],
        chasisNo: [this.editData?.ChasisNo, [Validators.required]],
        modelName: [this.editData?.VehicleModel, [Validators.required]],
        fitnessExpDate: [
           this.dateService.convertToUTC(this.editData?.FitnessDate),
          [Validators.required],
        ],
      });
    } else {
      this.vehicleMasterForm = this.fb.group({
        companyName: ['', [Validators.required]],
        user: ['', [Validators.required]],
        vehicleType: ['', [Validators.required]],
        mfgYear: [null, [Validators.required]],
        vehicleNo: ['', [Validators.required]],
        maker: ['', [Validators.required]],
        engineNo: ['', [Validators.required]],
        chasisNo: ['', [Validators.required]],
        modelName: ['', [Validators.required]],
        fitnessExpDate: ['', [Validators.required]],
      });
    }
  }

  // for close modal
  close() {
    this.bsModelService.hide();
  }

  onSelectCompany(event: any) {
    const companyId = event?.value?.value;
    this.getUserDropdown(companyId);
  }

  // for Company dropdown here
  getCompanyDropdown() {
    let newData: any[] = [];
    this.commonService?.companyDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data
        ?.filter((val: any) => val?.ParentCompanyId == 0)
        .map((val: any) => ({
          value: val?.pk_CompanyId,
          text: val?.CompanyName,
        }));
      this.companyDropdown = newData;
      if (this.editData && this.editData?.fk_CompanyId) {
        const selectCompany = this.companyDropdown.find(
          (ele: any) => ele.value === this.editData?.fk_CompanyId
        );
        this.vehicleMasterForm.controls['companyName'].setValue(selectCompany);
        this.getUserDropdown(selectCompany.value);
      }
    });
  }

  // for User dropdown here
  getUserDropdown(compId: any) {
    this.vehicleMasterForm.controls['user'].setValue(null);

    let newData: any[] = [];
    this.commonService?.userDropdown().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data
        ?.filter((val: any) => val?.fk_CompanyId == compId)
        .map((val: any) => ({
          value: val?.pk_UserId,
          text: val?.UserName,
        }));
      this.userDropdown = newData;
      if (this.editData && this.editData?.fk_UserId) {
        const selectCompany = this.userDropdown.find(
          (ele: any) => ele.value === this.editData?.fk_UserId
        );
        this.vehicleMasterForm.controls['user'].setValue(selectCompany);
      }
    });
  }

  // for Vehicle dropdown here
  getVehicletypeDropdown() {
    let newData: any[] = [];
    this.commonService?.vehicleTypeDrropdown().subscribe((res: any) => {
      let data = res?.body?.result;
      this.vehicleTypeDropdown = data?.map((val: any) => ({
        value: val?.pk_VehicleTypeId,
        text: val?.VehicleType,
      }));

      if (this.editData && this.editData?.fk_VehicleTypeId) {
        const selectCompany = this.vehicleTypeDropdown.find(
          (ele: any) => ele.value === this.editData?.fk_VehicleTypeId
        );
        this.vehicleMasterForm.controls['vehicleType'].setValue(selectCompany);
      }
    });
  }

  confirm(event: any) {
    this.vehicleMasterForm.controls['fitnessExpDate'].patchValue(event?.dateTime);
  }

  //**Create Vehicle here */
  submit(formValue: any) {    
    let payload: any = {
      MfgYear: formValue?.mfgYear,
      VehicleNo: formValue?.vehicleNo,
      VehicleMake: formValue?.maker,
      EngineNo: formValue?.engineNo,
      ChasisNo: formValue?.chasisNo,
      VehicleModel: formValue?.modelName,
      FitnessDate:  formatDate(this.vehicleMasterForm.get('fitnessExpDate')?.value, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      CreatedBy: this.userDetail?.UserName,
      fk_VehicleTypeId: Number(formValue?.vehicleType?.value),
      fk_CompanyId: Number(formValue?.companyName?.value),
      fk_UserId: Number(formValue?.user?.value),
      VehicleType: formValue?.vehicleType?.text,
    };
    let service: any;
    if (!this.editData?.pk_VehicleId) {
      service = this.vehicleMasterService?.createVehicleMaster(payload);
    } else {
      delete payload['CreatedBy'];
      payload['UpdatedBy'] = this.userDetail?.UserName;
      service = this.vehicleMasterService?.updateVehicle(
        this.editData?.pk_VehicleId,
        payload
      );
    }

    service.subscribe((res: any) => {
      if (res?.body?.status_code == 200) {
        this.bsModelService.hide();
        this.refreshService.announceCustomerAdded();
        this.notificationService.successAlert(res?.body?.result);
      } else {
        this.notificationService.errorAlert(res?.error?.details[0]?.message);
      }
    });
  }
}
