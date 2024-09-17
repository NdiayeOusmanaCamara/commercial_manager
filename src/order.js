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

async function getOrderDetailsById(orderId) {
  try {
    if (!orderId) {
      throw new Error('Order ID is required.');
    }

    const [order] = await pool.execute("SELECT * FROM purchase_orders WHERE id = ?", [orderId]);
    if (order.length === 0) {
      console.log('Order not found.');
      return;
    }

    const [details] = await pool.execute("SELECT * FROM order_details WHERE order_id = ?", [orderId]);
     console.log('===== Order Details =====');
    // console.log('Order:', order);
    console.table(details.length > 0 ? details : 'No details found.');
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
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
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0.");
    }
    await pool.execute(
      "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [order_id, product_id, quantity, price]
    );
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error("Unable to add order detail.");
  }
}



async function updateOrder(id, date, customer_id, delivery_address, track_number, status) {
  try {
    if (!id || !date || !customer_id || !delivery_address || !track_number || !status) {
      throw new Error('Missing params');
    }
    const [result] = await pool.execute(
      "UPDATE purchase_orders SET date = ?, customer_id = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?",
      [date, customer_id, delivery_address, track_number, status, id]
    );
    console.log(result.affectedRows > 0 ? 'Order updated successfully.' : 'Order not found.');
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function updateOrderDetails(orderId, product_id, quantity, price) {
  try {
    if (!orderId || !product_id || !quantity || !price) {
      throw new Error('Missing parameters for order details.');
    }

    const [result] = await pool.execute(
      "UPDATE order_details SET quantity = ?, price = ? WHERE order_id = ? AND product_id = ?",
      [quantity, price, orderId, product_id]
    );
    
    console.log(result.affectedRows > 0 ? 'Order details updated.' : 'Order details not found.');
  } catch (error) {
    console.error('Error updating order details:', error.message);
    throw error;
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
  getOrderDetailsById,
  addOrder,
  addOrderDetail,
  updateOrder,
  updateOrderDetails,
  destroyOrder,
};
