import { Friend } from '@prisma/client';

import { dbClient } from '../../prisma/client';
import { isDayBeforeLeapDay } from '../utils/dates';
import { rootLogger } from '../utils/logger';

const logger = rootLogger('getBirthdaysToday');

/**
 * Service: Get all birthdays today
 *
 * This service will get a list of all friends who have a birthday today.
 *
 * TODO: We're not handling "belated" birthdays...
 */
export const getBirthdaysToday = async (): Promise<Friend[]> => {
  logger.info('Fetching all birthdays today');

  const birthdays = (await dbClient.$queryRaw`
    SELECT * FROM friends
    WHERE strftime('%m-%d', date_of_birth / 1000, 'unixepoch') = strftime('%m-%d', 'now', 'utc')
    AND
    (
      last_processed_at IS NULL
      OR
      date(last_processed_at / 1000, 'unixepoch', 'utc') < date('now', 'utc')
    )`) as Friend[];

  logger.info(`Found ${birthdays.length} birthdays`);

  if (!isDayBeforeLeapDay()) return birthdays;

  const leapDayBirthdays = (await dbClient.$queryRaw`
    SELECT * FROM friends
    WHERE strftime('%m-%d', date_of_birth / 1000, 'unixepoch', 'utc') = '02-29'
    AND
    (
      last_processed_at IS NULL
      OR
      date(last_processed_at / 1000, 'unixepoch', 'utc') < date('now', 'utc')
    )`) as Friend[];

  return birthdays.concat(leapDayBirthdays);
};
