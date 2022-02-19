import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChildrensComponent } from './edit-childrens.component';

describe('EditChildrensComponent', () => {
  let component: EditChildrensComponent;
  let fixture: ComponentFixture<EditChildrensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChildrensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChildrensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
