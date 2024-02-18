const sql = require("mssql/msnodesqlv8");
const config = require("./config");

exports.connection = sql.connect(config.config);
