import { DownloadDataModule } from './download-data.module';

describe('DownloadDataModule', () => {
  let downloadDataModule: DownloadDataModule;

  beforeEach(() => {
    downloadDataModule = new DownloadDataModule();
  });

  it('should create an instance', () => {
    expect(downloadDataModule).toBeTruthy();
  });
});
