import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicChemistryComponent } from './organic-chemistry.component';

describe('OrganicChemistryComponent', () => {
  let component: OrganicChemistryComponent;
  let fixture: ComponentFixture<OrganicChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicChemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
