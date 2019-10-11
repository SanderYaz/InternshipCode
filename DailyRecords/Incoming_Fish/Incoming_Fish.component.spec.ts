/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Incoming_FishComponent } from './Incoming_Fish.component';

describe('Incoming_FishComponent', () => {
  let component: Incoming_FishComponent;
  let fixture: ComponentFixture<Incoming_FishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Incoming_FishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Incoming_FishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
