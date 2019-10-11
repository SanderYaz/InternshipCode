import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestAcceptanceComponent } from './harvest-acceptance.component';

describe('HarvestAcceptanceComponent', () => {
  let component: HarvestAcceptanceComponent;
  let fixture: ComponentFixture<HarvestAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarvestAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
