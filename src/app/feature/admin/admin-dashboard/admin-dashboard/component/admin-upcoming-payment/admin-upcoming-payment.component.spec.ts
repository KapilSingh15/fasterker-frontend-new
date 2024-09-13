import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpcomingPaymentComponent } from './admin-upcoming-payment.component';

describe('AdminUpcomingPaymentComponent', () => {
  let component: AdminUpcomingPaymentComponent;
  let fixture: ComponentFixture<AdminUpcomingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpcomingPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUpcomingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
