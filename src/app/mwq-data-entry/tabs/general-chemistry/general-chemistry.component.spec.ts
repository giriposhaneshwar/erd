import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralChemistryComponent } from './general-chemistry.component';

describe('GeneralChemistryComponent', () => {
  let component: GeneralChemistryComponent;
  let fixture: ComponentFixture<GeneralChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralChemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
