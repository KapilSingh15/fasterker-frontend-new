import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAdminUserComponent } from './filter-admin-user.component';

describe('FilterAdminUserComponent', () => {
  let component: FilterAdminUserComponent;
  let fixture: ComponentFixture<FilterAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterAdminUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
