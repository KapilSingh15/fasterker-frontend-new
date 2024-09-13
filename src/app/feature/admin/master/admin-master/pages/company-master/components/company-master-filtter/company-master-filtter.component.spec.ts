import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMasterFiltterComponent } from './company-master-filtter.component';

describe('CompanyMasterFiltterComponent', () => {
  let component: CompanyMasterFiltterComponent;
  let fixture: ComponentFixture<CompanyMasterFiltterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyMasterFiltterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMasterFiltterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
