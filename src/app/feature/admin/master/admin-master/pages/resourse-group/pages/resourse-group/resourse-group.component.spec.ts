import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourseGroupComponent } from './resourse-group.component';

describe('ResourseGroupComponent', () => {
  let component: ResourseGroupComponent;
  let fixture: ComponentFixture<ResourseGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourseGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
