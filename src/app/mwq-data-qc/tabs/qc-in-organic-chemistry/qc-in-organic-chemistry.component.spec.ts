import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcInOrganicChemistryComponent } from './qc-in-organic-chemistry.component';

describe('QcInOrganicChemistryComponent', () => {
  let component: QcInOrganicChemistryComponent;
  let fixture: ComponentFixture<QcInOrganicChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcInOrganicChemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcInOrganicChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
