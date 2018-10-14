import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcInSituParametersComponent } from './qc-in-situ-parameters.component';

describe('QcInSituParametersComponent', () => {
  let component: QcInSituParametersComponent;
  let fixture: ComponentFixture<QcInSituParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcInSituParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcInSituParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
