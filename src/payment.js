const pool = require('./db');


async function get() {
  try {
    const [rows] = await pool.execute("SELECT * FROM payments");
    console.log('====Payments list=====');
    return rows.length > 0 ? rows : console.log('No payments.');
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}


async function add(order_id, date, amount, payment_method) {
  try {
    if (typeof payment_method !== 'string') {
      throw new Error('Payment method must be a string');
    }
    const [result] = await pool.execute(
      "INSERT INTO payments (order_id, date, amount, payment_method) VALUES (?, ?, ?, ?)",
      [order_id, date, amount, payment_method]
    );
    console.log('Payment added:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}


async function update(id, order_id, date, amount, payment_method) {
  try {
    const [result] = await pool.execute(
      "UPDATE payments SET order_id = ?, date = ?, amount = ?, payment_method = ? WHERE id = ?",
      [order_id, date, amount, payment_method, id]
    );
    console.log(result.affectedRows > 0 ? 'Payment updated.' : 'Payment not found.');
    return result.affectedRows;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}


async function destroy(id) {
  try {
    const [result] = await pool.execute("DELETE FROM payments WHERE id = ?", [id]);
    console.log(result.affectedRows > 0 ? 'Payment deleted.' : 'Payment not found.');
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      console.error(`Cannot delete: Payment ID ${id} is referenced.`);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
