import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({ providedIn: 'any' })
export class GlobalErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error) {
    const chunkFailedMessageWithDigit = /Loading chunk [\d]+ failed/;
    const chunkFailedMessageWithSpace = /Loading chunk [^\s]+ failed/;

    LoggingService.logException(error);
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    super.handleError(error);
    if (
      chunkFailedMessageWithDigit.test(error.message) ||
      chunkFailedMessageWithSpace.test(error.message)
    ) {
      LoggingService.logTrace(
        'Reloaded page successfully for load chunk error'
      );
      window.location.reload();
      return;
    }
    LoggingService.logTrace(
      'Reloaded page unsuccessfully for load chunk error'
    );
  }
}
