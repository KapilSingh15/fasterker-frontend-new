import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReportsComponent } from './trip-reports.component';

describe('TripReportsComponent', () => {
  let component: TripReportsComponent;
  let fixture: ComponentFixture<TripReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
