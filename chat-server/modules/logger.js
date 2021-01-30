/* logger.js

@Author: Daniel Flockert
Creates a logger depending on the passed log level
*/

const dateformat = require("dateformat");

module.exports = function(loglevel) {
    return require("console-log-level")({
        prefix: function (level) {
            return `[${dateformat(new Date(), "yyyy-mm-dd HH:MM:ss")} ${level.toUpperCase()}]`
        },
        level: loglevel
    });
}