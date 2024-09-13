import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCompaniesComponent } from './child-companies.component';

describe('ChildCompaniesComponent', () => {
  let component: ChildCompaniesComponent;
  let fixture: ComponentFixture<ChildCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
