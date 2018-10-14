import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcMicroBiologyComponent } from './qc-micro-biology.component';

describe('QcMicroBiologyComponent', () => {
  let component: QcMicroBiologyComponent;
  let fixture: ComponentFixture<QcMicroBiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcMicroBiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcMicroBiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
