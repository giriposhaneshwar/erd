import { BuoysdashboardModule } from './buoysdashboard.module';

describe('BuoysdashboardModule', () => {
  let buoysdashboardModule: BuoysdashboardModule;

  beforeEach(() => {
    buoysdashboardModule = new BuoysdashboardModule();
  });

  it('should create an instance', () => {
    expect(buoysdashboardModule).toBeTruthy();
  });
});
