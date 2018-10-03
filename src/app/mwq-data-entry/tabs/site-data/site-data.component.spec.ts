import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDataComponent } from './site-data.component';

describe('SiteDataComponent', () => {
  let component: SiteDataComponent;
  let fixture: ComponentFixture<SiteDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
