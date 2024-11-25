import { Friend } from '@prisma/client';

import { FailedToSendMessageError } from '../errors';
import { createEmailBody, emailSubject } from '../utils/create-email-body';
import { rootLogger } from '../utils/logger';

const logger = rootLogger('sendBirthdayEmail');

/**
 * Service: Example mailer service
 *
 * This service does not actually send mail, it's purely here to illustrate what
 * that may look like in practice.
 *
 * In a real world setting we would use a service such as Twilio, Klaviyo or
 * Mailgun.
 */
export const sendBirthdayEmail = async (friend: Friend): Promise<void> => {
  const { first_name, last_name, email } = friend;

  const fullName = `${first_name} ${last_name}`;

  try {
    const messageToSend = {
      to: email,
      subject: emailSubject,
      body: createEmailBody(first_name),
    };

    logger.info(`Sending birthday message to ${fullName}`, messageToSend);

    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (e) {
    logger.error(`Failed to send birthday message to ${fullName}`, e);
    throw new FailedToSendMessageError();
  }
};
