import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceManagementComponent } from './create-resource-management.component';

describe('CreateResourceManagementComponent', () => {
  let component: CreateResourceManagementComponent;
  let fixture: ComponentFixture<CreateResourceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateResourceManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateResourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
