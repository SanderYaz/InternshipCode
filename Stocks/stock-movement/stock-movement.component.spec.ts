import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementComponent } from './stock-movement.component';

describe('StockMovementComponent', () => {
  let component: StockMovementComponent;
  let fixture: ComponentFixture<StockMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
