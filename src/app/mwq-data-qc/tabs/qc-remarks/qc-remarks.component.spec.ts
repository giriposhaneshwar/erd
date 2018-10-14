import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcRemarksComponent } from './qc-remarks.component';

describe('QcRemarksComponent', () => {
  let component: QcRemarksComponent;
  let fixture: ComponentFixture<QcRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
