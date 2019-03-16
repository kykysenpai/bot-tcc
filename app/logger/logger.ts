import * as winston from "winston";
import {Logger} from "winston";

const logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'server.log'}),
        new winston.transports.Console({format: winston.format.simple()})
    ]
});

export default logger;
