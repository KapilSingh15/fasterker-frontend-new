import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureReportComponent } from './temperature-report.component';

describe('TemperatureReportComponent', () => {
  let component: TemperatureReportComponent;
  let fixture: ComponentFixture<TemperatureReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemperatureReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
