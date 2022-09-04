/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import { ReporterContext, ReporterOnStartOptions, TestResult } from '@jest/reporters';

export default class CustomReporter {
  private _globalConfig: unknown;

  private _options: ReporterOnStartOptions;

  private _context: ReporterContext;

  private _shouldFail: any;

  constructor(globalConfig: unknown, reporterOptions: ReporterOnStartOptions, reporterContext: ReporterContext) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  onRunComplete(testContexts: any, results: any) {
    for (const test of (results.testResults as Record<any, any>[])) {
      if (test.perfStats.slow) {
        console.log(test);
      }
    }

    console.log(`Failed Tests: ${results.numFailedTestSuites}`);
    console.log('Custom reporter output:');
    // console.log('global config: ', this._globalConfig);
    console.log('options for this reporter from Jest config: ', this._options);
    console.log('reporter context passed from test scheduler: ', this._context);
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
