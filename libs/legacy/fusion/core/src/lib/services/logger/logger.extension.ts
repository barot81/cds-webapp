import { LoggingService } from './logging.service';

export let tabCount: any;

export const log = (function () {
  var context = 'My Descriptive Logger Prefix:';
  const self = this;
  return function () {
    return Function.prototype.bind.call(
      LoggingService.logException,
      self,
      context
    );
  };
})();

export const logError = (function (errorMessage) {
  var context = errorMessage;
  return Function.prototype.bind.call(console.error, console, context);
})();

declare global {
  interface logger {
    trace();
    log();
  }
}

export class Logger {
  public static counter = 0;
  public static trace(message: string, properties?: any) {
    const traceMsg = `${this.counter++} : ${message}`;
    // console.log(traceMsg);
    LoggingService.logTrace(traceMsg, Logger.getTabData(properties));
  }

  public static error(
    errorMessage,
    handledAt?: string,
    properties?: any,
    measurements?: any
  ) {
    LoggingService.logException(
      errorMessage,
      handledAt,
      Logger.getTabData(properties),
      measurements
    );
  }

  public static events(name, properties?: any, measurements?: any) {
    LoggingService.logEvent(name, properties, measurements);
  }

  static getTabData(properties: any) {
    const tabsData = `Total tabs:${tabCount?.tabsCounter}, Active TabID:${tabCount?.tabId}`;
    const props = { ...properties, tabData: tabsData };
    return props;
  }
}
