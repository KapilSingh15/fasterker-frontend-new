import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcReportComponent } from './ac-report.component';

describe('AcReportComponent', () => {
  let component: AcReportComponent;
  let fixture: ComponentFixture<AcReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
