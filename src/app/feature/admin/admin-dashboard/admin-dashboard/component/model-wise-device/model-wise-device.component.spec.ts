import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelWiseDeviceComponent } from './model-wise-device.component';

describe('ModelWiseDeviceComponent', () => {
  let component: ModelWiseDeviceComponent;
  let fixture: ComponentFixture<ModelWiseDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelWiseDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelWiseDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
