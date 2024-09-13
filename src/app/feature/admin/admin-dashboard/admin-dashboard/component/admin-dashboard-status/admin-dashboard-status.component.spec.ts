import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardStatusComponent } from './admin-dashboard-status.component';

describe('AdminDashboardStatusComponent', () => {
  let component: AdminDashboardStatusComponent;
  let fixture: ComponentFixture<AdminDashboardStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
