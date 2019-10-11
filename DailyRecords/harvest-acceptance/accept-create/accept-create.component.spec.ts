import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCreateComponent } from './accept-create.component';

describe('AcceptCreateComponent', () => {
  let component: AcceptCreateComponent;
  let fixture: ComponentFixture<AcceptCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
