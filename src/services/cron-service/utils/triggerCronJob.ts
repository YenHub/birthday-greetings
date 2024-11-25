import { CronJob } from 'cron';

import { noOp } from '../../../utils/no-op';

export interface CronConfig {
  /**
   * The schedule for the  cronJob. Supports a resolution of 1 second.
   *
   * @see https://github.com/kelektiv/node-cron?tab=readme-ov-file#cron-patterns
   *
   * @see http://crontab.org/
   */
  cronTime: string;

  /** A function which triggers your service */
  cronJob: VoidFunction;

  /** A function which runs once your service exits */
  onComplete?: VoidFunction;

  /** Skip the first iteration or trigger immediately @default false */
  startImmediately?: boolean;

  /** @see https://timeapi.io/documentation/iana-timezones @default 'Europe/London'*/
  timeZone?: string;
}

/**
 * Helper Util: Trigger a cron job
 *
 * {@link CronConfig}
 *
 * @see https://www.npmjs.com/package/cron
 */
export const triggerCronJob = ({
  cronTime,
  cronJob: onTick,
  onComplete = noOp,
  startImmediately = true,
  timeZone = 'Europe/London',
}: CronConfig): CronJob<VoidFunction> => {
  return new CronJob(
    cronTime,
    onTick,
    onComplete,
    true,
    timeZone,
    null,
    startImmediately,
  );
};
