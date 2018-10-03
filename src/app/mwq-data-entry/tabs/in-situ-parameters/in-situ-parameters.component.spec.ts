import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InSituParametersComponent } from './in-situ-parameters.component';

describe('InSituParametersComponent', () => {
  let component: InSituParametersComponent;
  let fixture: ComponentFixture<InSituParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InSituParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InSituParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
