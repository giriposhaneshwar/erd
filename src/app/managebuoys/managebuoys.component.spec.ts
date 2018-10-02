import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebuoysComponent } from './managebuoys.component';

describe('ManagebuoysComponent', () => {
  let component: ManagebuoysComponent;
  let fixture: ComponentFixture<ManagebuoysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagebuoysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagebuoysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
