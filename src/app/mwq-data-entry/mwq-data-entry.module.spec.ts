import { MwqDataEntryModule } from './mwq-data-entry.module';

describe('MwqDataEntryModule', () => {
  let mwqDataEntryModule: MwqDataEntryModule;

  beforeEach(() => {
    mwqDataEntryModule = new MwqDataEntryModule();
  });

  it('should create an instance', () => {
    expect(mwqDataEntryModule).toBeTruthy();
  });
});
