import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisoryFilterComponent } from './hisory-filter.component';

describe('HisoryFilterComponent', () => {
  let component: HisoryFilterComponent;
  let fixture: ComponentFixture<HisoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HisoryFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HisoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
