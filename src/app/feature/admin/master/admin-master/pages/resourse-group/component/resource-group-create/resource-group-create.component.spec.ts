import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceGroupCreateComponent } from './resource-group-create.component';

describe('ResourceGroupCreateComponent', () => {
  let component: ResourceGroupCreateComponent;
  let fixture: ComponentFixture<ResourceGroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceGroupCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
