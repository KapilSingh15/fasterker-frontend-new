import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMasterComponent } from './device-master.component';

describe('DeviceMasterComponent', () => {
  let component: DeviceMasterComponent;
  let fixture: ComponentFixture<DeviceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
