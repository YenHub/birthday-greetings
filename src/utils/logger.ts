import winston, { Logger } from 'winston';

/** Logs will be written to the .gitignored .logs directory */
const logDirectory = '.logs';

/** Write all logs with importance level of `error` or less to `error.log` */
const errorLogsTransport: winston.transport = new winston.transports.File({
  filename: `${logDirectory}/winston-error.log`,
  level: 'error',
});

/** Write all logs with importance level of `info` or less to `combined.log` */
const combinedLogsTransport: winston.transport = new winston.transports.File({
  filename: `${logDirectory}/winston-combined.log`,
});

/** Write all logs to the console */
const allLogsTransport: winston.transport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
});

/** Default format applied to all logs */
const defaultFormat: Logger['format'] = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const winstonLogger = winston.createLogger({
  level: 'info',
  format: defaultFormat,
  transports: [
    errorLogsTransport,
    combinedLogsTransport,
    ...(process.env.NODE_ENV !== 'test' ? [allLogsTransport] : []),
  ],
});

/**
 * This logger is designed to be used for any backend service.
 *
 * **USAGE:**
 * ```ts
 * const { info, error, warn } = rootLogger('some-service-name')
 *
 * info({message: 'Oops', detail: 'Something is going wrong'})
 * warn('Very wrong...')
 * error('Yep, we did do a boo boo!!')
 * ```
 */
export const rootLogger = (logSource: string): Logger =>
  winstonLogger.child({ logSource });
