import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMasterListComponent } from './company-master-list.component';

describe('CompanyMasterListComponent', () => {
  let component: CompanyMasterListComponent;
  let fixture: ComponentFixture<CompanyMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyMasterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
