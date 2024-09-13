import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVehicleMapComponent } from './live-vehicle-map.component';

describe('LiveVehicleMapComponent', () => {
  let component: LiveVehicleMapComponent;
  let fixture: ComponentFixture<LiveVehicleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveVehicleMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveVehicleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
