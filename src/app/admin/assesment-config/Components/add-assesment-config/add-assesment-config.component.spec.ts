import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssesmentConfigComponent } from './add-assesment-config.component';

describe('AddAssesmentConfigComponent', () => {
  let component: AddAssesmentConfigComponent;
  let fixture: ComponentFixture<AddAssesmentConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssesmentConfigComponent]
    });
    fixture = TestBed.createComponent(AddAssesmentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
