const mysql = require("mysql2/promise");


const connPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "41445524",
  database: "commercial_manager",
  waitForConnections: true,
  connectTimeout: false 
});


(async () => {
  try {
    const connection = await connPool.getConnection();
    console.log("CONNECTED to the database");
    connection.release(); 
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

module.exports = connPool;
