import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcreateComponent } from './projectcreate.component';

describe('ProjectcreateComponent', () => {
  let component: ProjectcreateComponent;
  let fixture: ComponentFixture<ProjectcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
