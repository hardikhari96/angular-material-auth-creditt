import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDetaisComponent } from './edit-user-detais.component';

describe('EditUserDetaisComponent', () => {
  let component: EditUserDetaisComponent;
  let fixture: ComponentFixture<EditUserDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserDetaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
