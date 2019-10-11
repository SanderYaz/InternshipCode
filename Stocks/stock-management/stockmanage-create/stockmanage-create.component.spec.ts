import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmanageCreateComponent } from './stockmanage-create.component';

describe('StockmanageCreateComponent', () => {
  let component: StockmanageCreateComponent;
  let fixture: ComponentFixture<StockmanageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmanageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmanageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
