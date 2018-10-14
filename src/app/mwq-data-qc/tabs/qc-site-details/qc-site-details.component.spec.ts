import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcSiteDetailsComponent } from './qc-site-details.component';

describe('QcSiteDetailsComponent', () => {
  let component: QcSiteDetailsComponent;
  let fixture: ComponentFixture<QcSiteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcSiteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcSiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
