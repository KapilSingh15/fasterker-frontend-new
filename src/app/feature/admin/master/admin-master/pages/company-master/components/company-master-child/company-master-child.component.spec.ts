import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMasterChildComponent } from './company-master-child.component';

describe('CompanyMasterChildComponent', () => {
  let component: CompanyMasterChildComponent;
  let fixture: ComponentFixture<CompanyMasterChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyMasterChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMasterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
