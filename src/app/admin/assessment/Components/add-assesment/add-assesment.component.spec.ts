import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssesmentComponent } from './add-assesment.component';

describe('AddAssesmentComponent', () => {
  let component: AddAssesmentComponent;
  let fixture: ComponentFixture<AddAssesmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssesmentComponent]
    });
    fixture = TestBed.createComponent(AddAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
