import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmovementEntryComponent } from './stockmovement-entry.component';

describe('StockmovementEntryComponent', () => {
  let component: StockmovementEntryComponent;
  let fixture: ComponentFixture<StockmovementEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmovementEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmovementEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
