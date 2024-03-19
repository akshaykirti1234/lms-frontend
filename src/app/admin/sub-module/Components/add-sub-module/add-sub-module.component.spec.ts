import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubModuleComponent } from './add-sub-module.component';

describe('AddSubModuleComponent', () => {
  let component: AddSubModuleComponent;
  let fixture: ComponentFixture<AddSubModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubModuleComponent]
    });
    fixture = TestBed.createComponent(AddSubModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
