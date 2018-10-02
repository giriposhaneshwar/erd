import { MwqDataQcModule } from './mwq-data-qc.module';

describe('MwqDataQcModule', () => {
  let mwqDataQcModule: MwqDataQcModule;

  beforeEach(() => {
    mwqDataQcModule = new MwqDataQcModule();
  });

  it('should create an instance', () => {
    expect(mwqDataQcModule).toBeTruthy();
  });
});
