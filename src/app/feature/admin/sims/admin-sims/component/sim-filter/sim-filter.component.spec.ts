import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimFilterComponent } from './sim-filter.component';

describe('SimFilterComponent', () => {
  let component: SimFilterComponent;
  let fixture: ComponentFixture<SimFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
