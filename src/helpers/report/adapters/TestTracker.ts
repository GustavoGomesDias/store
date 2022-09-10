/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable semi */
export type TestReporterOnStartOptions = {
  estimatedTime: number
  showStatus: boolean
  numTests: number
};

export type TestFields = {
  duration: number
  fullName: string
  testFilePath: string
}

export type TestResults = {
  testResults: Omit<TestFields, 'testFilePath'>[]
  testFilePath: string
}

export default interface TestReporterAdapter {
  _globalConfig: unknown
  _options: TestReporterOnStartOptions
  _shouldFail: any;
  slowTests: Array<TestFields>;

  onRunComplete(): Promise<void>
  onTestResult(test: unknown, testResult: TestResults): void
  slowTestTime(slowestTests: TestFields[]): number
  allTestTime(): number
};
