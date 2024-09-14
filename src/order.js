const pool = require('./db');


async function getOrders() {
  try {
    const [rows] = await pool.execute("SELECT * FROM purchase_orders");
    console.log('=====Orders list =====');
    return rows.length > 0 ? rows : console.log('No orders.');
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function getOrderDetails() {
  try {
    const [rows] = await pool.execute("SELECT * FROM order_details");
    console.log('=====Orders details list =====');
    return rows.length > 0 ? rows :console.log('No order details.') ;
  } catch (error) {
    throw new Error("Unable to fetch order details.");
  }
}

async function addOrder(date, customer_id, delivery_address, track_number, status) {
  try {
    if (!date || !customer_id || !delivery_address || !track_number || !status) {
      throw new Error('Missing params');
    }
    const [result] = await pool.execute(
      "INSERT INTO purchase_orders (date, customer_id, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)",
      [date, customer_id, delivery_address, track_number, status]
    );
    console.log('Order added with ID:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('Error: ', error.message);
    throw error;
  }
}

async function addOrderDetail(order_id, product_id, quantity, price) {
  try {
    await pool.execute(
      "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [order_id, product_id, quantity, price]
    );
  } catch (error) {
    throw new Error("Unable to add order detail.");
  }
}

// async function updateOrder(id, date, customer_id, delivery_address, track_number, status) {
//   try {
//     await pool.execute(
//       "UPDATE purchase_orders SET date = ?, customer_id = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?",
//       [date, customer_id, delivery_address, track_number, status, id]
//     );
//   } catch (error) {
//     throw new Error("Unable to update order.");
//   }
// }

async function updateOrder(id, date, customer_id, delivery_address, track_number, status) {
  try {
    if (!id || !date || !customer_id || !delivery_address || !track_number || !status) {
      throw new Error('Missing params');
    }
    const [result] = await pool.execute(
      "UPDATE purchase_orders SET date = ?, customer_id = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?",
      [date, customer_id, delivery_address, track_number, status, id]
    );
    console.log(result.affectedRows > 0 ? 'Order updated.' : 'Order not found.');
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function updateOrderDetail(order_id, product_id, quantity, price) {
  try {
    await pool.execute(
      "UPDATE order_details SET quantity = ?, price = ? WHERE order_id = ? AND product_id = ?",
      [quantity, price, order_id, product_id]
    );
  } catch (error) {
    throw new Error("Unable to update order detail.");
  }
}

async function destroyOrder(orderId) {
  try {
    if (!orderId) {
      throw new Error('Order ID required');
    }
    const [result] = await pool.execute(
      "DELETE FROM purchase_orders WHERE id = ?",
      [orderId]
    );
    console.log(result.affectedRows > 0 ? 'Order deleted.' : 'Order not found.');
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = {
  getOrders,
  getOrderDetails,
  addOrder,
  addOrderDetail,
  updateOrder,
  updateOrderDetail,
  destroyOrder,
};
