import {TestConfig} from '@core/models';

export interface TestConfigWithRestart {
  config: TestConfig;
  restartTestProgress: boolean;
}
