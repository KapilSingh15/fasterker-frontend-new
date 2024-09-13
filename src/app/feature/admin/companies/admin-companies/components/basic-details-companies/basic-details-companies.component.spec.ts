import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailsCompaniesComponent } from './basic-details-companies.component';

describe('BasicDetailsCompaniesComponent', () => {
  let component: BasicDetailsCompaniesComponent;
  let fixture: ComponentFixture<BasicDetailsCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicDetailsCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicDetailsCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
