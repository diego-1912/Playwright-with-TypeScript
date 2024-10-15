import winston from 'winston';
import fs from 'fs';
import path from 'path';

class ProjectLogger {
  private static instance: ProjectLogger;
  private loggers: Map<string, winston.Logger> = new Map();
  private logDir: string = 'logs';

  private constructor() {
    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  public static getInstance(): ProjectLogger {
    if (!ProjectLogger.instance) {
      ProjectLogger.instance = new ProjectLogger();
    }
    return ProjectLogger.instance;
  }

  public getLogger(projectName: string): winston.Logger {
    if (!this.loggers.has(projectName)) {
      const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
          })
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: path.join(this.logDir, `${projectName}-test-run.log`),
            options: { flags: 'w' } // 'w' flag to overwrite the file on each run
          })
        ]
      });
      this.loggers.set(projectName, logger);
    }
    return this.loggers.get(projectName)!;
  }
}

export default ProjectLogger.getInstance();