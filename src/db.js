const mysql = require("mysql2/promise");

// Create the connection pool with configuration
const connPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nc41445524",
  database: "commercial_manager",
  waitForConnections: true,
  // connectionLimit: 10,
  connectTimeout: 10000 // Timeout after 10 seconds if connection fails
});

// Asynchronous function to check the connection
(async () => {
  try {
    const connection = await connPool.getConnection();
    console.log("CONNECTED to the database");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

module.exports = connPool;
