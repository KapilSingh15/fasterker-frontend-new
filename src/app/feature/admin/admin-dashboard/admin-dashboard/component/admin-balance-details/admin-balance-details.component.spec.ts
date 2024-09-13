import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBalanceDetailsComponent } from './admin-balance-details.component';

describe('AdminBalanceDetailsComponent', () => {
  let component: AdminBalanceDetailsComponent;
  let fixture: ComponentFixture<AdminBalanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBalanceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBalanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
