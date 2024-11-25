export const emailSubject = 'Happy birthday!';
const emailBodyTemplate = 'Happy birthday, dear';

/**
 * Helper Util: Create an email body for friend
 *
 * You can optionally specify whether the mail we're sending is belated by
 * passing in the second argument of `belated` as a boolean.
 *
 * NOTE: The default value for `belated` is `false`.
 */
export const createEmailBody = (first_name: string): string =>
  `${emailBodyTemplate} ${first_name}`;
