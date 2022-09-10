/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import TestReporterAdapter, { TestFields, TestReporterOnStartOptions, TestResults } from './adapters/TestTracker';

export default class CustomReporter implements TestReporterAdapter {
  _globalConfig: unknown;

  _options: TestReporterOnStartOptions;

  _shouldFail: any;

  slowTests: Array<TestFields>;

  constructor(globalConfig: unknown, reporterOptions: TestReporterOnStartOptions) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this.slowTests = [];
  }

  onRunComplete() {
    this.slowTests.sort((a, b) => b.duration - a.duration);
    const rootPathRegex = new RegExp(`^${process.cwd()}`);
    const slowestTests = this.slowTests.slice(0, this._options.numTests || 10);
    const slowTestTime = this.slowTestTime(slowestTests);
    const allTestTime = this.allTestTime();
    const percentTime = (slowTestTime / allTestTime) * 100;

    let reportReturn: string = `Top ${slowestTests.length} dos testes mais lentos (${slowTestTime / 1000} segundos,`
    + ` ${percentTime.toFixed(1)}% do tempo total):\n`;

    for (let i = 0; i < slowestTests.length; i++) {
      const { duration } = slowestTests[i];
      const { fullName } = slowestTests[i];
      const filePath = slowestTests[i].testFilePath.replace(rootPathRegex, '.');

      reportReturn += `  ${fullName}\n`;
      reportReturn += `    ${duration / 1000} segundos ${filePath} (${filePath.includes('test') ? 'integração' : 'unitário'})\n`;
    }

    console.log(reportReturn);
    console.log();
  }

  onTestResult(est: unknown, testResult: TestResults) {
    for (let i = 0; i < testResult.testResults.length; i++) {
      this.slowTests.push({
        duration: testResult.testResults[i].duration,
        fullName: testResult.testResults[i].fullName,
        testFilePath: testResult.testFilePath,
      });
    }
  }

  slowTestTime(slowestTests: TestFields[]): number {
    let slowTestTime = 0;
    for (let i = 0; i < slowestTests.length; i++) {
      slowTestTime += slowestTests[i].duration;
    }
    return slowTestTime;
  }

  allTestTime(): number {
    let allTestTime = 0;
    for (let i = 0; i < this.slowTests.length; i++) {
      allTestTime += this.slowTests[i].duration;
    }
    return allTestTime;
  }

  // Optionally, reporters can force Jest to exit with non zero code by returning
  // an `Error` from `getLastError()` method.
  // eslint-disable-next-line consistent-return
  getLastError() {
    if (this._shouldFail) {
      return new Error('Custom error reported!');
    }
  }
}
