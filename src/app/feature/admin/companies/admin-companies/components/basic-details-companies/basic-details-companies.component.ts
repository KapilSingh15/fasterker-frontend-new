import { Component } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../../../shared/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'basic-details-companies',
  templateUrl: './basic-details-companies.component.html',
  styleUrl: './basic-details-companies.component.scss'
})
export class BasicDetailsCompaniesComponent {
  config = {
    displayKey: "text",
    search: true
  };

  countries :any;
  state:any
  options:any
  userDetails: any;
  companyform!: FormGroup
  city: any;

  constructor(
    private commonService: CommonService,
    private fb : FormBuilder
  ) {}

  ngOnInit() {
    this.setInintialvalue();
    this.getCountryList();
  }

  //**set initialvalue in form field */
  setInintialvalue() {
    this.companyform = this.fb.group({
      companyName: ['', [Validators.required]],
      contactpersonName: ['',[Validators.required]],
      phn: ['', [Validators.required]],
      emergancyNo : ['', [Validators.required]],
      email : ['', [Validators.required]],
      add: ['', [Validators.required]],
      country : [null, [Validators.required]],
      state: [null, [Validators.required]],
      city : [null, [Validators.required]],
      postalCode : ['', [Validators.required]],
      tz : [null, [Validators.required]],
      subcriptionPlan : [null, [Validators.required]]
    })
  }

  //**country list here */
  getCountryList() {
    this.commonService.countryList().subscribe(
      data => {        
        this.countries = data?.body?.result;
        if (this.countries && this.countries?.length > 0) {
          const india:any = this.countries.find((country:any) => country.text === 'India');
          if (india) {
            this.companyform.controls['country'].patchValue(india)
            this.getStateList(india?.value);
          }
        }
      },
    );
  }

  //**country list here */
  getStateList(id:any) {
    this.commonService.stateList(id).subscribe(
      data => {        
        this.state = data?.body?.result;
        if (this.state && this.state?.length > 0) {
          const stateValue = this.state.find((country:any) => country.text === 'DELHI');
          if (stateValue) {
            this.companyform.controls['state'].patchValue(stateValue)
            this.getCityList(this.companyform.value.country, stateValue.value);
          }
        }        
      },
    );
  }

  onChangeCountry(event:any) {
    this.getStateList(event?.value);
  }

  onChangeState(event:any) {
    this.getCityList(this.companyform.value.country, event.value)
  }

  getCityList(countryId:any, stateId:any) {
    this.commonService.cityList(countryId.value,stateId).subscribe(
      data => {        
        this.city = data?.body?.result;
      },
    );
  }

  submit(formvalue:any) {
    console.log("check form", formvalue);
    
  }

}
