import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssesmentConfigComponent } from './view-assesment-config.component';

describe('ViewAssesmentConfigComponent', () => {
  let component: ViewAssesmentConfigComponent;
  let fixture: ComponentFixture<ViewAssesmentConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssesmentConfigComponent]
    });
    fixture = TestBed.createComponent(ViewAssesmentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
