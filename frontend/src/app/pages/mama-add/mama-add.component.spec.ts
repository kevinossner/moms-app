import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MamaAddComponent } from './mama-add.component';

describe('MamaAddComponent', () => {
  let component: MamaAddComponent;
  let fixture: ComponentFixture<MamaAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MamaAddComponent]
    });
    fixture = TestBed.createComponent(MamaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
