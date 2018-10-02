import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemwqdataComponent } from './managemwqdata.component';

describe('ManagemwqdataComponent', () => {
  let component: ManagemwqdataComponent;
  let fixture: ComponentFixture<ManagemwqdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemwqdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemwqdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
