const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const connPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nc41445524",
  database: "commercial_manager",
  waitForConnections: true,
  connectionLimit: 2,
});

connPool.getConnection().then(() => {
  console.log("CONNECTED");
});
module.exports = connPool;