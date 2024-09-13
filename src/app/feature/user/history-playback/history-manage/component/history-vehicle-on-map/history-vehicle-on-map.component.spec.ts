import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVehicleOnMapComponent } from './history-vehicle-on-map.component';

describe('HistoryVehicleOnMapComponent', () => {
  let component: HistoryVehicleOnMapComponent;
  let fixture: ComponentFixture<HistoryVehicleOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryVehicleOnMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryVehicleOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
