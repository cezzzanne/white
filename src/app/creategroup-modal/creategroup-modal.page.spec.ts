import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategroupModalPage } from './creategroup-modal.page';

describe('CreategroupModalPage', () => {
  let component: CreategroupModalPage;
  let fixture: ComponentFixture<CreategroupModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategroupModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategroupModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
