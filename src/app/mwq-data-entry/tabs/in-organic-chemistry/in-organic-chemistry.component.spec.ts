import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InOrganicChemistryComponent } from './in-organic-chemistry.component';

describe('InOrganicChemistryComponent', () => {
  let component: InOrganicChemistryComponent;
  let fixture: ComponentFixture<InOrganicChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InOrganicChemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InOrganicChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
