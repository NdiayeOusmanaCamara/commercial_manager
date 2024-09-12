const pool = require('./db'); 


async function get() {
  
  try {
    const [rows] = await pool.execute("SELECT * FROM customers");
    return rows;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; 
  }
}

async function add(name, address, email, phone) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO customers (name, address, email, phone) VALUES (?, ?, ?, ?)",
      [name, address, email, phone]
    );
    return result;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
}

async function update(id, name, address, email, phone) {
  try {
    const [result] = await pool.execute(
      "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
      [name, address, email, phone, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
}


async function destroy(id) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
