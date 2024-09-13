import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResoursePermissionComponent } from './resourse-permission.component';

describe('ResoursePermissionComponent', () => {
  let component: ResoursePermissionComponent;
  let fixture: ComponentFixture<ResoursePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResoursePermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResoursePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
