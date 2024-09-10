const connection = require('./db');

async function get() {
  const [rows] = await connection.execute("SELECT * FROM customers");
  return rows;
}

async function add(name, address, email, phone) {
  const [result] = await connection.execute(
    "INSERT INTO customers (name, address, email, phone) VALUES (?, ?, ?, ?)",
    [name, address, email, phone]
  );
  return result;
}

async function update(id, name, address, email, phone) {
  const [result] = await connection.execute(
    "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
    [name, address, email, phone, id]
  );
  return result;
}

async function destroy(id) {
  const [result] = await connection.execute(
    "DELETE FROM customers WHERE id = ?",
    [id]
  );
  return result;
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
