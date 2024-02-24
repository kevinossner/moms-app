import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsAddComponent } from './appointments-add.component';

describe('AppointmentsAddComponent', () => {
  let component: AppointmentsAddComponent;
  let fixture: ComponentFixture<AppointmentsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsAddComponent]
    });
    fixture = TestBed.createComponent(AppointmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
