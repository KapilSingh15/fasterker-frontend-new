import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../../../shared/services/common.service';
import { CompanyMasterService } from '../../services/company-master.service';
import { StorageService } from '../../../../../../../shared/services/storage.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../../../shared/services/notification.service';
import { Observable } from 'rxjs';
import { RefreshPageService } from '../../../../../../../shared/services/refresh-page.service';
@Component({
  selector: 'app-company-master-details',
  templateUrl: './company-master-details.component.html',
  styleUrl: './company-master-details.component.scss'
})
export class CompanyMasterDetailsComponent {
  @Output() mapdata = new EventEmitter()
  @Input() updateCompany: any
  config = {
    displayKey: "text",
    search: true
  };

  countries: any;
  state: any
  options: any
  userDetails: any;
  companyform!: FormGroup
  city: any;
  companyDropdown: any;

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
  userDetail: any;
  private cityListCache$: Observable<any> | null = null;
  private stateListCache$: Observable<any> | null = null;
  locationData: any;


  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private companyMasterService: CompanyMasterService,
    private storageService: StorageService,
    private modalService: BsModalService,
    private notificationService: NotificationService,
    private refreshService: RefreshPageService
  ) { }

  ngOnInit() {
    this.setInintialvalue();
    // this.getCountryList();
    this.getCompanyDropdown()
    this.getuserDetail()
    this.getLocationDetails()
  }

  // for get user details from local database
  getuserDetail() {
    this.storageService.getItem("userDetail").subscribe((value: any) => {
      this.userDetail = value
    })
  }

  //**set initialvalue in form field */
  setInintialvalue() {
    if (this.updateCompany) {
      const statusData = this.updateCompany?.IsActive == true ? {
        "value": 1,
        "text": "Active"
      }
        : {
          "value": 0,
          "text": "InActive"
        }
      this.companyform = this.fb.group({
        companyName: [this.updateCompany?.CompanyName, [Validators.required]],
        parentCompanyName: [''],
        mobile: [this.updateCompany?.MobileNo, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: [this.updateCompany?.Email, [Validators.required, Validators.email]],
        address: [this.updateCompany?.Address],
        country: [null, [Validators.required]],
        state: [null, [Validators.required]],
        city: [null, [Validators.required]],
        postalCode: [this.updateCompany?.MerchantCode],
        status: [statusData, [Validators.required]],
      })

    } else {
      this.companyform = this.fb.group({
        companyName: ['', [Validators.required]],
        parentCompanyName: [''],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        address: [''],
        country: [null, [Validators.required]],
        state: [null, [Validators.required]],
        city: [null, [Validators.required]],
        postalCode: [''],
        status: [null, [Validators.required]],
        // subcriptionPlan: [null, [Validators.required]]
      })
    }

  }

  // get country, state and city detail
  getLocationDetails() {
    let newData: any[] = [];
    this.commonService?.locationDetails().subscribe((res: any) => {
      this.locationData = res?.body?.result
      newData = this.locationData?.map((val: any) => ({
        value: val?.pk_CountryId,
        text: val?.CountryName
      }))
      this.countries = newData
    })
  }

  //**country list here */
  // getCountryList() {    
  //   this.commonService.countryList().subscribe(
  //     data => {
  //       this.countries = data?.body?.result;
  //       if (this.countries && this.countries?.length > 0) {
  //         const india: any = this.countries[0];
  //         if (india) {
  //           this.companyform.controls['country'].patchValue(india)
  //           this.getStateList(india?.value);
  //         }
  //       }
  //       if (this.updateCompany && this.updateCompany?.fk_CountryId) {
  //         const selectCountry = this.countries.find(
  //           (ele: any) => ele.value == this.updateCompany?.fk_CountryId
  //         );
  //         this.companyform.controls['country'].setValue(selectCountry);          
  //         this.getStateList(this.updateCompany?.fk_CountryId)
  //       }
  //     },
  //   );
  // }

  //**country list here */
  // getStateList(id: any) {
  //   this.stateListCache$ = null;
  //   this.commonService.stateList(id).subscribe(
  //     data => {
  //       this.state = data?.body?.result || [];
  //       let stateValue: any
  //       if (this.state && this.state?.length > 0 && !this.updateCompany) {
  //         stateValue = this.state[0];
  //         if (stateValue) {
  //           this.companyform.controls['state'].patchValue(stateValue)
  //         }
  //         this.getCityList(this.companyform.value.country, stateValue.value);
  //       }
  //       if (this.updateCompany && this.updateCompany?.fk_StateId) {
  //         const selectState = this.state.find(
  //           (ele: any) => ele.value == this.updateCompany?.fk_StateId
  //         );
  //         this.companyform.controls['state'].setValue(selectState);
  //         this.getCityList(this.companyform.value.country, this.updateCompany?.fk_StateId);
  //       }
  //     },
  //   );
  // }

  onChangeCountry(event: any) {
    let newData: any[] = [];
    const selectedCountryId = event?.value?.value;
    this.locationData?.forEach((val: any) => {
      if (val?.pk_CountryId == selectedCountryId) {
        newData = val?.State?.map((item: any) => ({
          value: item?.pk_StateId,
          text: item?.StateName
        }))
      }
    });
    this.state = newData;
  }


  onChangeState(event: any) {
    let newData: any[] = [];
    let data: any
    const selectedStateId = event?.value?.value;
    this.locationData?.forEach((val: any) => {
      data = val?.State?.forEach((value: any) => {
        if (value?.pk_StateId == selectedStateId && val?.pk_CountryId == value?.fk_CountryId) {
          newData = value?.District?.map((item: any) => ({
            value: item?.pk_DistrictId,
            text: item?.DistrictName
          }))
        }
      })
    })
    this.city = newData;
  }

  //**City list here */
  // getCityList(countryId: any, stateId: any) {
  //   this.cityListCache$ = null;
  //   this.commonService.cityList(countryId.value, stateId).subscribe((res: any) => {
  //     this.city = res?.body?.result || [];
  //     if (this.updateCompany) {
  //       const selectCity = this.city.find(
  //         (ele: any) => ele.value == this.updateCompany?.fk_DistrictId
  //       );
  //       this.companyform.controls['city'].setValue(selectCity);
  //     }
  //   });

  // }

  //**Company dropdown here */
  getCompanyDropdown() {
    let newData: any[] = [];
    this.commonService?.companyDropdownList().subscribe((res: any) => {
      let data = res?.body?.result?.data;
      newData = data?.filter((val: any) => val?.ParentCompanyId == 0).map((val: any) => ({
        value: val?.pk_CompanyId,
        text: val?.CompanyName
      }))
      this.companyDropdown = newData
      if (this.updateCompany && this.updateCompany?.ParentCompanyId) {
        const selectCompany = this.companyDropdown.find(
          (ele: any) => ele.value === this.updateCompany?.ParentCompanyId
        );
        this.companyform.controls['parentCompanyName'].setValue(selectCompany);
      }
    });
  }

  //**Create Company here */
  submit(formvalue: any) {
    let payload: any = {
      "CompanyName": formvalue?.companyName,
      "ParentCompanyId": Number(formvalue?.parentCompanyName?.value),
      "MobileNo": formvalue?.mobile,
      "MerchantCode": formvalue?.postalCode,
      "Email": formvalue?.email,
      "fk_CountryId": Number(formvalue?.country?.value),
      "fk_StateId": Number(formvalue?.state?.value),
      "fk_DistrictId": Number(formvalue?.city?.value),
      "CreatedBy": this.userDetail?.UserName,
      "IsActive": Number(formvalue?.status?.value),
      "fk_SubcriptionPlanId": 0,
      "Address": formvalue?.address
    }
    let service: any;
    if (!this.updateCompany?.pk_CompanyId) {
      service = this.companyMasterService?.createCompany(payload);
    } else {
      delete payload['CreatedBy'];
      payload['UpdatedBy'] = this.userDetail?.UserName;
      service = this.companyMasterService?.updateCompany(this.updateCompany?.pk_CompanyId, payload)
    }
    service.subscribe((res: any) => {
      if (res?.body?.status_code == 200) {
        this.modalService.hide()
        this.mapdata.emit()
        this.refreshService.announceCustomerAdded();
        this.notificationService.successAlert(res?.body?.result)
      } else {
        this.notificationService.errorAlert(res?.error?.details[0]?.message)
      }
    })

  }

  //**Close modal Here */
  cancel() {
    this.modalService.hide()
  }
}
