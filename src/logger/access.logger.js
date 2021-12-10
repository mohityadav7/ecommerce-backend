const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const isProduction = process.env.NODE_ENV === 'production';

const accessLogger = morgan(
    isProduction ? 'combined' : 'dev'
    // isProduction
    //     ? {
    //           stream: rfs.createStream('access.log', {
    //               interval: '1M',
    //               path: 'logs',
    //               size: '1Mb',
    //               maxFiles: 10,
    //               encoding: 'utf8',
    //           }),
    //       }
    //     : {}
);

module.exports = accessLogger;
