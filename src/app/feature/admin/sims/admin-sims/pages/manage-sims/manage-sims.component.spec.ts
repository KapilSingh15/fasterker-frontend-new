import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSimsComponent } from './manage-sims.component';

describe('ManageSimsComponent', () => {
  let component: ManageSimsComponent;
  let fixture: ComponentFixture<ManageSimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSimsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
