import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {
  @Input() date:any;
  @Output() dateTimeConfirm =  new EventEmitter();
  @Input() type:any;
  ngOnInit() {    
  }

  onChangeDate(event:any) {
    let data = {
      type : this.type,
      dateTime : event
    }
    
    this.dateTimeConfirm.emit(data)
  }
}
