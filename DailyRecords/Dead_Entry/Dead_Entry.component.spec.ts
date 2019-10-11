/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Dead_EntryComponent } from './Dead_Entry.component';

describe('Dead_EntryComponent', () => {
  let component: Dead_EntryComponent;
  let fixture: ComponentFixture<Dead_EntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dead_EntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dead_EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
