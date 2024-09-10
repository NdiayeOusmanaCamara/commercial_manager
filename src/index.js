const readlineSync = require('readline-sync');
const db = require('./db');
const customerModule = require('./customer');
const productModule = require('./product');

// const orderModule = require('./orderModule');

async function promptAddCustomer() {
  const name = readlineSync.question("Enter the customer name: ");
  const address = readlineSync.question("Enter the address: ");
  const email = readlineSync.question("Enter the email: ");
  const phone = readlineSync.question("Enter the phone number: ");
  await customerModule.add(name, address, email, phone);
  console.log('Customer added successfully.');
}

async function promptAddProduct() {
  const name = readlineSync.question("Enter the product name: ");
  const description = readlineSync.question("Enter the product description: ");
  const price = readlineSync.questionFloat("Enter the product price: ");
  const stock = readlineSync.questionFloat("Enter the product stock: ");
  const category = readlineSync.questionFloat("Enter the product category: ");
  const barcode = readlineSync.questionFloat("Enter the product barcode: ");
  const status = readlineSync.questionFloat("Enter the product status: ");
  await productModule.add(name, description, price, stock, category, barcode, status);
  console.log('Product added successfully.');
}

async function promptAddOrder() {
  const customer_id = readlineSync.questionInt("Enter the customer ID: ");
  const order_date = readlineSync.question("Enter the order date (YYYY-MM-DD): ");
  const orderResult = await orderModule.createOrder(customer_id, order_date);

  const orderId = orderResult.insertId;
  while (true) {
    const product_id = readlineSync.questionInt("Enter the product ID (or 0 to finish): ");
    if (product_id === 0) break;
    const quantity = readlineSync.questionInt("Enter the quantity: ");
    await orderModule.addOrderDetail(orderId, product_id, quantity);
    console.log('Product added to order.');
  }
  console.log('Order created successfully.');
}

async function mainMenu() {
  while (true) {
    console.log(`
      1. List Customers
      2. Add Customer
      3. Update Customer
      4. Delete Customer
      5. List Products
      6. Add Product
      7. Update Product
      8. Delete Product
      9. Create Order
      10. List Orders
      0. Exit
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        console.table(await customerModule.get());
        break;
      case "2":
        await promptAddCustomer();
        break;
      case "3":
        const updateCustomerId = readlineSync.questionInt("Enter the customer ID to update: ");
        const updatedCustomerData = promptAddCustomer();
        await customerModule.update(updateCustomerId, updatedCustomerData.name, updatedCustomerData.address, updatedCustomerData.email, updatedCustomerData.phone);
        console.log('Customer updated successfully.');
        break;
      case "4":
        const deleteCustomerId = readlineSync.questionInt("Enter the customer ID to delete: ");
        await customerModule.destroy(deleteCustomerId);
        console.log('Customer deleted successfully.');
        break;
      case "5":
        console.table(await productModule.get());
        break;
      case "6":
        await promptAddProduct();
        break;
      case "7":
        const updateProductId = readlineSync.questionInt("Enter the product ID to update: ");
        const updatedProductData = promptAddProduct();
        await productModule.update(updateProductId, updatedProductData.name, updatedProductData.description, updatedProductData.price,updatedProductData.stock,updatedProductData.category,updatedProductData.barcode,updatedProductData.status);
        console.log('Product updated successfully.');
        break;
      case "8":
        const deleteProductId = readlineSync.questionInt("Enter the product ID to delete: ");
        await productModule.destroy(deleteProductId);
        console.log('Product deleted successfully.');
        break;
      case "9":
        await promptAddOrder();
        break;
      case "10":
        console.table(await orderModule.getOrders());
        break;
      case "0":
        console.log('Exiting...');
        process.exit();
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

mainMenu();
