const isDevelopment = import.meta.env.VITE_APP_NODE_ENV === 'development';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogStyles {
  debug: string;
  info: string;
  warn: string;
  error: string;
}

const styles: LogStyles = {
  debug: 'color: #808080',
  info: 'color: #0066cc',
  warn: 'color: #ff9900',
  error: 'color: #cc0000'
};

const formatMessage = (level: LogLevel, message: string, ...args: any[]) => {
  const timestamp = new Date().toISOString();
  return [`%c[${timestamp}] [${level.toUpperCase()}] ${message}`, styles[level], ...args];
};

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.debug(...formatMessage('debug', message, ...args));
    }
  },
  info: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.info(...formatMessage('info', message, ...args));
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(...formatMessage('warn', message, ...args));
    }
  },
  error: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.error(...formatMessage('error', message, ...args));
    }
  }
}; 