import winston from "winston";
import "winston-daily-rotate-file";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
        service: "user-service"
    },
    transports: [
        
        new winston.transports.DailyRotateFile({
            datePattern: "DD-MM-YYYY",
            filename: `logs/error.log`,
            level: "error"
        }),
        new winston.transports.DailyRotateFile({
            datePattern: "DD-MM-YYYY",
            filename: `logs/all.log`,
            level: "debug"
        })
    ]
});
  
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
