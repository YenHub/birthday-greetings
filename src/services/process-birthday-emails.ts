import { dbClient } from '../../prisma/client';
import { rootLogger } from '../utils/logger';
import { getBirthdaysToday } from './get-birthdays-today';
import { sendBirthdayEmail } from './mailer-service';

const logger = rootLogger('processBirthdays');

/**
 * Service: Process birthday emails
 *
 * Fetch all birthdays today and send an email to each person wishing them
 * Happy Birthday 🎂
 */
export const processBirthdayEmails = async (): Promise<void> => {
  const birthdaysToday = await getBirthdaysToday();

  if (birthdaysToday.length === 0) {
    logger.info('Found no birthdays to process today');

    return;
  }

  logger.info(`Processing ${birthdaysToday.length} birthdays`);

  for (const record of birthdaysToday) {
    await sendBirthdayEmail(record);

    try {
      // Set the `last_processed_at` so we don't keep sending this message
      await dbClient.friend.update({
        where: { id: record.id },
        data: { last_processed_at: new Date() },
      });
    } catch (e) {
      /**
       * TODO: We should push this somewhere so it can be investigated
       *
       * We don't need to throw the application here though as we're still able
       * to send our birthday messages. This can be picked up in the logs and
       * alerting later.
       */
      logger.error('Failed to set last_processed_at', { record, e });
    }
  }

  logger.info(`Successfully processed ${birthdaysToday.length} birthdays`);
};
