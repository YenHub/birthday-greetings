import { dbClient } from '../../prisma/client';
import { FailedToImportFriendsError } from '../errors';
import { FriendInput } from '../types/FriendInput';
import { rootLogger } from '../utils/logger';

const logger = rootLogger('importNewFriends');

/**
 * Service: Import friends data into the DB
 *
 * NOTE: `upsertMany` does not currently exist on Prisma, this workaround
 * allows us to effectively skip duplicates when writing friends to the DB.
 *
 * @see https://github.com/prisma/prisma/issues/4134
 */
export const importFriends = async (
  friendsToImport: FriendInput[],
): Promise<void> => {
  const { length: friendCount } = friendsToImport;

  logger.info(`Importing ${friendCount} friends`);

  try {
    await dbClient.$transaction(
      friendsToImport.map(friend =>
        dbClient.friend.upsert({
          where: { email: friend.email },
          create: { ...friend },
          /**
           * NOTE: Skip on update, we only wish to write new entries
           *
           * We could later leverage this approach to update existing people
           * whose email address have changed
           */
          update: {},
        }),
      ),
    );

    logger.info(`Successfully imported ${friendCount} friends`);
  } catch (e) {
    logger.error('Failed to import friends', e);
    throw new FailedToImportFriendsError();
  }
};
