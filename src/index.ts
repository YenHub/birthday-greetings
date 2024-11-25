import { initialiseCronJobs } from './services/cron-service';
import { importFriends } from './services/import-friends';
import { parseCsv } from './services/parse-csv';
import { rootLogger } from './utils/logger';

const logger = rootLogger('main');

/** Helper Util: Run the initial friends parsing & import service */
const runInitialImport = async (fileToProcess: string): Promise<void> => {
  const friendsToImport = parseCsv(fileToProcess);

  await importFriends(friendsToImport);
};

const main = async (): Promise<void> => {
  logger.info('Application Started');

  const fileLocation = process.argv
    .find(arg => arg.startsWith('--file'))
    ?.split('=')[1];

  if (!fileLocation) throw new Error('Please specify a file to process');

  await runInitialImport(fileLocation);

  initialiseCronJobs();
};

main();
