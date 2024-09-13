import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourseMasterComponent } from './resourse-master.component';

describe('ResourseMasterComponent', () => {
  let component: ResourseMasterComponent;
  let fixture: ComponentFixture<ResourseMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourseMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
