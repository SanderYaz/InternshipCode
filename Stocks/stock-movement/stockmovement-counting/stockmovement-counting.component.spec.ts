import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmovementCountingComponent } from './stockmovement-counting.component';

describe('StockmovementCountingComponent', () => {
  let component: StockmovementCountingComponent;
  let fixture: ComponentFixture<StockmovementCountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmovementCountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmovementCountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
