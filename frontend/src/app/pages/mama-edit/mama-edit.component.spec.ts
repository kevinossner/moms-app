import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MamaEditComponent } from './mama-edit.component';

describe('MamaEditComponent', () => {
  let component: MamaEditComponent;
  let fixture: ComponentFixture<MamaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MamaEditComponent]
    });
    fixture = TestBed.createComponent(MamaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
