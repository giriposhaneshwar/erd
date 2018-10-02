import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqDataEntryComponent } from './mwq-data-entry.component';

describe('MwqDataEntryComponent', () => {
  let component: MwqDataEntryComponent;
  let fixture: ComponentFixture<MwqDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
