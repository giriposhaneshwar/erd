import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqDataQcComponent } from './mwq-data-qc.component';

describe('MwqDataQcComponent', () => {
  let component: MwqDataQcComponent;
  let fixture: ComponentFixture<MwqDataQcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqDataQcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqDataQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
