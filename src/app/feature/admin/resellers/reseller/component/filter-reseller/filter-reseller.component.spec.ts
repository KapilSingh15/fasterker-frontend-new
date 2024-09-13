import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterResellerComponent } from './filter-reseller.component';

describe('FilterResellerComponent', () => {
  let component: FilterResellerComponent;
  let fixture: ComponentFixture<FilterResellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterResellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
