import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotifyComponent } from './view-notify.component';

describe('ViewNotifyComponent', () => {
  let component: ViewNotifyComponent;
  let fixture: ComponentFixture<ViewNotifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNotifyComponent]
    });
    fixture = TestBed.createComponent(ViewNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
