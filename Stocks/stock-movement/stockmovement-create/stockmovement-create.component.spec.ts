import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmovementCreateComponent } from './stockmovement-create.component';

describe('StockmovementCreateComponent', () => {
  let component: StockmovementCreateComponent;
  let fixture: ComponentFixture<StockmovementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmovementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmovementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
