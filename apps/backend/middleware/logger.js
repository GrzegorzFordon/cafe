import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
const __dirname = import.meta.dirname;

const logEvents = async (message, logFileName) => {
  // const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  // const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  // try {
  //   const logsPath = path.join(__dirname, "..", "logs");
  //   if (!fs.existsSync(logsPath)) {
  //     await fsPromises.mkdir(logsPath);
  //   }
  //   await fsPromises.appendFile(path.join(logsPath, logFileName), logItem);
  // } catch (error) {
  //   console.log(error);
  // }
};

const logger = (req, res, next) => {
  // logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  // console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
