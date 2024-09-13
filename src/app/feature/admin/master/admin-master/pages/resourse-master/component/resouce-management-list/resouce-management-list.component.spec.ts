import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResouceManagementListComponent } from './resouce-management-list.component';

describe('ResouceManagementListComponent', () => {
  let component: ResouceManagementListComponent;
  let fixture: ComponentFixture<ResouceManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResouceManagementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResouceManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
