import chalk from 'chalk';
let logger: {
  log: (message: any, ...rest: any[]) => void;
  info: (message: any, ...rest: any[]) => void;
  warn: (message: any, ...rest: any[]) => void;
  error: (message: any, ...rest: any[]) => void;
};
(() => {
  logger = {
    log: (message: any, ...rest) => {
      console.log(chalk.cyanBright(message, ...rest));
    },
    info: (message: any, ...rest) => {
      console.log(chalk.greenBright(message, ...rest));
    },
    warn: (message: any, ...rest) => {
      console.log(chalk.yellowBright(message, ...rest));
    },
    error: (message: any, ...rest) => {
      console.log(chalk.redBright(message, ...rest));
    }
  };
})();

export default logger;
