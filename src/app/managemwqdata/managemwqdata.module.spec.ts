import { ManagemwqdataModule } from './managemwqdata.module';

describe('ManagemwqdataModule', () => {
  let managemwqdataModule: ManagemwqdataModule;

  beforeEach(() => {
    managemwqdataModule = new ManagemwqdataModule();
  });

  it('should create an instance', () => {
    expect(managemwqdataModule).toBeTruthy();
  });
});
