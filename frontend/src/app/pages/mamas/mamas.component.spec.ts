import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MamasComponent } from './mamas.component';

describe('MamasComponent', () => {
  let component: MamasComponent;
  let fixture: ComponentFixture<MamasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MamasComponent]
    });
    fixture = TestBed.createComponent(MamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
