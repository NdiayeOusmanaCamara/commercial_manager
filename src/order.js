const pool = require('./db'); 
async function getOrders() {
  try {
    const [rows] = await pool.execute(`SELECT * FROM purchase_orders`);
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

async function addOrder(date, customer_id, delivery_address, track_number, status) {
  try {
    if (!date || !customer_id || !delivery_address || !track_number || !status) {
      throw new Error('Missing required parameters');
    }

    const [result] = await pool.execute(
      `INSERT INTO purchase_orders (date, customer_id, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)`,
      [date, customer_id, delivery_address, track_number, status]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

async function updateOrder(id, date, customer_id, delivery_address, track_number, status) {
  try {
    if (!id || !date || !customer_id || !delivery_address || !track_number || !status) {
      throw new Error('Missing required parameters');
    }

    const [result] = await pool.execute(
      `UPDATE purchase_orders
       SET date = ?, customer_id = ?, delivery_address = ?, track_number = ?, status = ?
       WHERE id = ?`,
      [date, customer_id, delivery_address, track_number, status, id]
    );

    return result;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

async function destroyOrder(id) {
  try {
    if (!id) {
      throw new Error('Order ID is required');
    }

    const [result] = await pool.execute(`DELETE FROM purchase_orders WHERE id = ?`, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}


module.exports = {
  getOrders,
  addOrder,
  updateOrder,
  destroyOrder,
  
};
