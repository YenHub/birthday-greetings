import fs from 'fs';

import { FailedToParseCsvError } from '../errors';
import { FriendInput } from '../types/FriendInput';
import { rootLogger } from '../utils/logger';
import { normaliseDate } from '../utils/normalise-date';

const logger = rootLogger('parseCsv');

/**
 * Service: Parse a CSV containing friends data
 *
 * The CSV should be formatted like so:
 *
 * ```csv
 * last_name, first_name, date_of_birth, email
 * Doe, John, 1982/10/08, john.doe@foobar.com
 * ```
 *
 * While this approach is rudimentary, the solution fits the complexity of our
 * current data set, however; there are other tools out there which are better
 * equipped to handle this process and the edge cases we may encounter such as
 * escaping separators.
 *
 * This solution reads into memory, so it's worthwhile noting that a bigger data
 * set would cause performance challenges which could be solved with an OTS
 * solution. e.g. fast-csv, csv-parse, papaparse, csv etc...
 */
export const parseCsv = (fileLocation: string): FriendInput[] => {
  logger.info(`Parsing the specified file: ${fileLocation}`);

  try {
    const data = fs.readFileSync(fileLocation, { encoding: 'utf-8' });

    // Get our header row and the remaining rows
    const [headerRow, ...rows] = data.split('\n');

    // Split our headers as columns
    const headers = headerRow.split(',').map(header => header.trim());

    // Filter any empty rows and split the row data into columns
    const friends = rows.filter(it => it).map(row => row.split(','));

    // Create a map of header indexes to help positionally address the data
    const headerIndexes = headers.reduce((acc, cur, ind) => {
      return { ...acc, [cur]: ind };
    }, {} as Record<keyof FriendInput, number>);

    // Transform the data into an array of FriendInput
    const parsedFriends = friends.reduce((acc, cur) => {
      const date_of_birth = normaliseDate(cur[headerIndexes['date_of_birth']]);

      const record = {
        date_of_birth,
        email: cur[headerIndexes['email']].trim(),
        last_name: cur[headerIndexes['last_name']].trim(),
        first_name: cur[headerIndexes['first_name']].trim(),
      } satisfies FriendInput;

      return [...acc, record];
    }, [] as FriendInput[]);

    logger.info(`Parsing complete, found ${parsedFriends.length} friends`);

    return parsedFriends;
  } catch (e) {
    /** TODO: Send this to DataDog or a similar event logger */
    logger.error(`Failed to parse ${fileLocation}`, e);
    throw new FailedToParseCsvError();
  }
};
