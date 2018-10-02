import { ManagebuoysModule } from './managebuoys.module';

describe('ManagebuoysModule', () => {
  let managebuoysModule: ManagebuoysModule;

  beforeEach(() => {
    managebuoysModule = new ManagebuoysModule();
  });

  it('should create an instance', () => {
    expect(managebuoysModule).toBeTruthy();
  });
});
