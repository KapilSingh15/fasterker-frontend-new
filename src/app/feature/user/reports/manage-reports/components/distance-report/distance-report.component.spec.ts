import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceReportComponent } from './distance-report.component';

describe('DistanceReportComponent', () => {
  let component: DistanceReportComponent;
  let fixture: ComponentFixture<DistanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistanceReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
