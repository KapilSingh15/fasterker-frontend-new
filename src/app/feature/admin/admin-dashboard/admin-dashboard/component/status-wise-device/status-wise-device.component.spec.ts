import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWiseDeviceComponent } from './status-wise-device.component';

describe('StatusWiseDeviceComponent', () => {
  let component: StatusWiseDeviceComponent;
  let fixture: ComponentFixture<StatusWiseDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusWiseDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusWiseDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
