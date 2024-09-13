const pool = require('./db'); 


async function get() {
  try {
    const [rows] = await pool.execute("SELECT * FROM customers");
    console.log(rows.length > 0 ? 'Customer list retrieved.' : 'No customers found.');
    return rows;
  } catch (error) {
    console.error('Error fetching:', error.message);
    throw error;
  }
}


async function add(name, address, email, phone) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO customers (name, address, email, phone) VALUES (?, ?, ?, ?)",
      [name, address, email, phone]
    );
    console.log('Customer added.');
    return result;
  } catch (error) {
    console.error('Error adding:', error.message);
    throw error;
  }
}


async function update(id, name, address, email, phone) {
  try {
    const [result] = await pool.execute(
      "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
      [name, address, email, phone, id]
    );
    console.log(result.affectedRows > 0 ? 'Customer updated.' : 'Customer not found.');
    return result;
  } catch (error) {
    console.error('Error updating:', error.message);
    throw error;
  }
}

// Delete a customer
async function destroy(id) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );
    console.log(result.affectedRows > 0 ? 'Customer deleted.' : 'Customer not found.');
    return result;
  } catch (error) {
    console.error('Error deleting:', error.message);
    throw error;
  }
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
