import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePermissionListComponent } from './resource-permission-list.component';

describe('ResourcePermissionListComponent', () => {
  let component: ResourcePermissionListComponent;
  let fixture: ComponentFixture<ResourcePermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourcePermissionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourcePermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
