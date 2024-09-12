const pool = require("./db"); 


async function get() {
  try {
    const [rows] = await pool.execute("SELECT * FROM products");
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
}


async function add(name, description, price, stock, category, barcode, status) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category, barcode, status]
    );
    return result;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}


async function update(id, name, description, price, stock, category, barcode, status) {
  try {
    const [result] = await pool.execute(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
      [name, description, price, stock, category, barcode, status, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}


async function destroy(id) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
