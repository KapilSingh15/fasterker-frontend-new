import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  @Input() vehicleData :any;
  @Output() selectVehicle = new EventEmitter()
  vehicleList:any;

  constructor(
    private CommonService : CommonService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['vehicleData']) {
      this.vehicleList = this.vehicleData;
    }
    
  }

  formatVehicleStatusDuration(vehicle: any) {
    if ((vehicle?.ResultCode == 2)) {
      return `${vehicle.ResultMessage[0]}`
    } else {
      if (!vehicle || !vehicle?.StatusDuration || vehicle?.StatusDuration == null) return;

      if (vehicle?.ResultCode == 3 && vehicle?.PointValidity?.CurrentPointType == 0) {
        return 'Licence point missing.';
      }else if(vehicle?.ResultCode == 3 && vehicle?.PointValidity?.CurrentPointType == 1){
        return 'Point expired, please recharge the point.';
      }  else if (vehicle?.ResultCode == 4 && vehicle?.PointValidity?.CurrentPointType == 0) {
        return 'Licence point missing.';
      }else if (vehicle?.ResultCode == 4 && vehicle?.PointValidity?.CurrentPointType == 1) {
        return 'Customer validity expired';
      } 
    
      const parts = vehicle.StatusDuration.split(' ');
      if (parts[0] === 'Never') {
        return `${vehicle.StatusDuration}`
      }
      if (!vehicle || !vehicle.StatusDuration || !vehicle?.Eventdata) {
        return '';
      }
      if (parts[0] === 'Running') {
        return `${parts[0]}(${vehicle?.Eventdata?.Speed} Km/h)`
      } else {
        const formattedTime = this.CommonService.formatTimeValue(parts[2]);
        return `${parts[0]}(${formattedTime})`;
      }
      
    }
  }

  getVehicleColor(vehicle: any): string {
    if (vehicle?.Status === 1 && vehicle?.SubStatus === 1) {
      return 'status-0';
    } else if (vehicle?.Status === 1 && vehicle?.SubStatus === 2) {
      return 'status-1-substatus-2';
    } else if (vehicle?.Status === 1 && vehicle?.SubStatus === 3) {
      return 'status-2-substatus-3';
    } else if (vehicle?.Status === 0) {
      return 'status-0-no-substatus';
    } else {
      return 'status';
    }
  }

  getVehicleStatus(vehicle:any) {
    return this.CommonService.onCheckVehicleDevice(vehicle)
  }

  onSelectVehice(vehicle:any) {
    this.selectVehicle.emit(vehicle)
  }

  
}
