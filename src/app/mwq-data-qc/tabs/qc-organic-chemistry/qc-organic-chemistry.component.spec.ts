import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcOrganicChemistryComponent } from './qc-organic-chemistry.component';

describe('QcOrganicChemistryComponent', () => {
  let component: QcOrganicChemistryComponent;
  let fixture: ComponentFixture<QcOrganicChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcOrganicChemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcOrganicChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
