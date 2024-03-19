import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTechnologyComponent } from './view-technology.component';

describe('ViewTechnologyComponent', () => {
  let component: ViewTechnologyComponent;
  let fixture: ComponentFixture<ViewTechnologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTechnologyComponent]
    });
    fixture = TestBed.createComponent(ViewTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
