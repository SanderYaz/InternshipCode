/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Incoming_FeedComponent } from './Incoming_Feed.component';

describe('Incoming_FeedComponent', () => {
  let component: Incoming_FeedComponent;
  let fixture: ComponentFixture<Incoming_FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Incoming_FeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Incoming_FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
