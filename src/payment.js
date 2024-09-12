const pool = require('./db'); 
async function get() {
    const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await pool.execute("SELECT * FROM payments");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}


async function add(order_id, date, amount, payment_method) {
    const connection = await pool.getConnection();
    try {
      
      if (typeof payment_method !== 'string') {
        throw new Error('Payment method must be a string');
      }
      
      const [result] = await pool.execute(
        "INSERT INTO payments (order_id, date, amount, payment_method) VALUES (?, ?, ?, ?)",
        [order_id, date, amount, payment_method]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }


async function update(id, order_id, date, amount, payment_method) {
    const connection = await pool.getConnection();
  try {
    const [result] = await pool.execute(
      "UPDATE payments SET order_id = ?, date = ?, amount = ?, payment_method = ? WHERE id = ?",
      [order_id, date, amount, payment_method, id]
    );
    return result.affectedRows;
} catch (error) {
  throw error;
}
}


async function destroy(id) {
    const connection = await pool.getConnection();
  try {
    const [result] = await pool.execute(
      "DELETE FROM payments WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
        throw new Error(`Deletion error ${id}`);
      }
      throw error;
    } finally {
      connection.release();
    }
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
