import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMasterDetailsComponent } from './company-master-details.component';

describe('CompanyMasterDetailsComponent', () => {
  let component: CompanyMasterDetailsComponent;
  let fixture: ComponentFixture<CompanyMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyMasterDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
