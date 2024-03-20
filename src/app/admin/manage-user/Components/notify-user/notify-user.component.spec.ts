import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyUserComponent } from './notify-user.component';

describe('NotifyUserComponent', () => {
  let component: NotifyUserComponent;
  let fixture: ComponentFixture<NotifyUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyUserComponent]
    });
    fixture = TestBed.createComponent(NotifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
