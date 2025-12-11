import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverspeedReportComponent } from './overspeed-report.component';

describe('OverspeedReportComponent', () => {
  let component: OverspeedReportComponent;
  let fixture: ComponentFixture<OverspeedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverspeedReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverspeedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
