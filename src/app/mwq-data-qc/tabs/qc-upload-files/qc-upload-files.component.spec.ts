import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcUploadFilesComponent } from './qc-upload-files.component';

describe('QcUploadFilesComponent', () => {
  let component: QcUploadFilesComponent;
  let fixture: ComponentFixture<QcUploadFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcUploadFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
