import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesResellerComponent } from './manages-reseller.component';

describe('ManagesResellerComponent', () => {
  let component: ManagesResellerComponent;
  let fixture: ComponentFixture<ManagesResellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagesResellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagesResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
