import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuoysdashboardComponent } from './buoysdashboard.component';

describe('BuoysdashboardComponent', () => {
  let component: BuoysdashboardComponent;
  let fixture: ComponentFixture<BuoysdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuoysdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuoysdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
