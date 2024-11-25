import { cronJobs } from './cron-jobs';
import { triggerCronJob } from './utils/triggerCronJob';

/**
 * Service: NodeJS Cron Scheduler
 *
 * @see https://github.com/kelektiv/node-cron
 */
export const initialiseCronJobs = (): void => cronJobs.forEach(triggerCronJob);
