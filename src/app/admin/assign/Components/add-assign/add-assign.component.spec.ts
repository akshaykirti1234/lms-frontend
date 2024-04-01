import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignComponent } from './add-assign.component';

describe('AddAssignComponent', () => {
  let component: AddAssignComponent;
  let fixture: ComponentFixture<AddAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssignComponent]
    });
    fixture = TestBed.createComponent(AddAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
