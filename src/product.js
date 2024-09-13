const pool = require("./db");

async function get() {
  try {
    const [rows] = await pool.execute("SELECT * FROM products");
    console.log('=====List product====');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
}

async function add(name, description, price, stock, category, barcode, status) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category, barcode, status]
    );
    console.log(`Product added with ID: ${result.insertId}`);
    return result;
  } catch (error) {
    console.error('Error adding product:', error.message);
    throw error;
  }
}

async function update(id, name, description, price, stock, category, barcode, status) {
  try {
    const [result] = await pool.execute(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
      [name, description, price, stock, category, barcode, status, id]
    );
    if (result.affectedRows > 0) {
      console.log(`Product updated with ID: ${id}`);
    } else {
      console.log('No product with this ID.');
    }
    return result;
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw error;
  }
}

async function destroy(id) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    if (result.affectedRows > 0) {
      console.log(`Product deleted with ID: ${id}`);
    } else {
      console.log('No product with this ID.');
    }
    return result;
  } catch (error) {
    console.error('Error deleting product:', error.message);
    throw error;
  }
}

module.exports = {
  get,
  add,
  update,
  destroy,
};
