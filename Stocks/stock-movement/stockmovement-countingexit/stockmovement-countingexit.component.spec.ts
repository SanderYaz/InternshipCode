import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmovementCountingexitComponent } from './stockmovement-countingexit.component';

describe('StockmovementCountingexitComponent', () => {
  let component: StockmovementCountingexitComponent;
  let fixture: ComponentFixture<StockmovementCountingexitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmovementCountingexitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmovementCountingexitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
