import { processBirthdayEmails } from '../process-birthday-emails';
import { CronConfig } from './utils/triggerCronJob';

const processBirthdayEmailsCron = {
  cronJob: processBirthdayEmails,
  // Run 9am daily
  cronTime: '* 0 9 * * *',
};

/**
 * Here is where we define our cronJobs.
 *
 * We could extend this later adding different types of jobs, such as an SMS
 * handler.
 */
export const cronJobs: CronConfig[] = [processBirthdayEmailsCron];
