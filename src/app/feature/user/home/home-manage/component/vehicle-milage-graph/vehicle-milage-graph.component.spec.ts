import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMilageGraphComponent } from './vehicle-milage-graph.component';

describe('VehicleMilageGraphComponent', () => {
  let component: VehicleMilageGraphComponent;
  let fixture: ComponentFixture<VehicleMilageGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleMilageGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleMilageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
