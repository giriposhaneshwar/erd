import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcGeneralChemistryComponent } from './qc-general-chemistry.component';

describe('QcGeneralChemistryComponent', () => {
  let component: QcGeneralChemistryComponent;
  let fixture: ComponentFixture<QcGeneralChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcGeneralChemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcGeneralChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
