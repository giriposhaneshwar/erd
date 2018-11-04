import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcInfoComponent } from './qc-info.component';

describe('QcInfoComponent', () => {
  let component: QcInfoComponent;
  let fixture: ComponentFixture<QcInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
