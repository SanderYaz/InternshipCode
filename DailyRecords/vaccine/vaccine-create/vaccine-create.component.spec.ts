import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCreateComponent } from './vaccine-create.component';

describe('VaccineCreateComponent', () => {
  let component: VaccineCreateComponent;
  let fixture: ComponentFixture<VaccineCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
