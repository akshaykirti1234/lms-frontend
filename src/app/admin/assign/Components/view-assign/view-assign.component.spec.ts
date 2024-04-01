import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignComponent } from './view-assign.component';

describe('ViewAssignComponent', () => {
  let component: ViewAssignComponent;
  let fixture: ComponentFixture<ViewAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssignComponent]
    });
    fixture = TestBed.createComponent(ViewAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
