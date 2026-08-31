export const logger = {
  info: (message: string, ...meta: any[]) => {
    console.log(`\x1b[36m[INFO]\x1b[0m ${new Date().toISOString()} - ${message}`, ...meta);
  },
  warn: (message: string, ...meta: any[]) => {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${new Date().toISOString()} - ${message}`, ...meta);
  },
  error: (message: string, ...meta: any[]) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${new Date().toISOString()} - ${message}`, ...meta);
  },
  debug: (message: string, ...meta: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`\x1b[35m[DEBUG]\x1b[0m ${new Date().toISOString()} - ${message}`, ...meta);
    }
  },
};
