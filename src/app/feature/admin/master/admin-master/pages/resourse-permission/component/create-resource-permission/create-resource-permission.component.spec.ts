import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourcePermissionComponent } from './create-resource-permission.component';

describe('CreateResourcePermissionComponent', () => {
  let component: CreateResourcePermissionComponent;
  let fixture: ComponentFixture<CreateResourcePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateResourcePermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateResourcePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
