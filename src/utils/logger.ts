import { ConsoleLogger, LogLevel } from "@nabcellent/sui-react";
import { CONFIG } from '../config';

export const LOG_LEVEL: LogLevel = CONFIG.logging.level || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug');
export const logger = new ConsoleLogger({ level: LOG_LEVEL });