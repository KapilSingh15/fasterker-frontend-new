import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hisory-filter',
  templateUrl: './hisory-filter.component.html',
  styleUrl: './hisory-filter.component.scss'
})
export class HisoryFilterComponent {
  config = {
    displayKey: "description", 
    search: true 
  };

  options = [
    {
      "id": 1,
      "description": "Option 1"
    },
    {
      "id": 2,
      "description": "Option 2"
    },
    {
      "id": 3,
      "description": "Option 3"
    }
  ];

  selectDate = [
    { id: 1, description: 'Today' },
    { id: 2, description: 'Yesterday' },
    { id: 3, description: '7 Days' },
    { id: 6, description: 'Custom' }
  ];

  selectedOption: any;
  historyForm!: FormGroup;
  customDate: boolean = false;
  isOverSpeed: boolean = false;  

  constructor(
    private fb: FormBuilder
  ) {}


  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    const currentDate = new Date();
    const currentDayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    currentDayStart.setHours(0, 0, 1);

    const currentDayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    currentDayEnd.setHours(23, 59, 59);

    this.historyForm = this.fb.group({
      deviceId: [null, [Validators.required]],
      timeformat: ['Today', [Validators.required]],
      fromDate: [currentDayStart],
      toDate: [new Date()]
    });

    this.historyForm.get('timeformat')?.valueChanges.subscribe(value => {
      if (value === 'Custom') {
        this.historyForm.get('fromDate')?.setValue(currentDayStart);
        this.historyForm.get('toDate')?.setValue(new Date());
      } else {
        let newFromDate = new Date(currentDayStart);
        let newToDate = new Date(currentDayEnd);

        switch (value) {
          case 'Yesterday':
            newFromDate.setDate(currentDate.getDate() - 1);
            newToDate.setDate(currentDate.getDate() - 1);
            newToDate.setHours(23, 59, 59);
            break;
          case 'Weekly':
            newFromDate.setDate(currentDate.getDate() - 7);
            break;
          case '15 Days':
            newFromDate.setDate(currentDate.getDate() - 15);
            break;
          case '30 Days':
            newFromDate.setDate(currentDate.getDate() - 30);
            break;
          default:
            break;
        }
        this.historyForm.get('fromDate')?.setValue(newFromDate);
        this.historyForm.get('toDate')?.setValue(newToDate);
      }
    });
  }

  confirm(event: any) {
    {event && event?.type == 'fromDate' ? this.historyForm.controls['fromDate'].patchValue(event?.dateTime) 
      : this.historyForm.controls['toDate']?.patchValue(event?.dateTime);
    }
  }

  timecheck(event: any) {
    this.isOverSpeed = true;
    if (event?.value?.description === "Custom") {
      this.customDate = true;
    } else {
      this.customDate = false;
    }

  }
}
