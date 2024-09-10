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

async function promptUpdateCustomer() {
  const updateCustomerId = readlineSync.questionInt("Enter the customer ID to update: ");
  const name = readlineSync.question("Enter the new customer name: ");
  const address = readlineSync.question("Enter the new address: ");
  const email = readlineSync.question("Enter the new email: ");
  const phone = readlineSync.question("Enter the new phone number: ");
  await customerModule.update(updateCustomerId, name, address, email, phone);
  console.log('Customer updated successfully.');
}

async function promptAddProduct() {
  const name = readlineSync.question("Enter the product name: ");
  const description = readlineSync.question("Enter the product description: ");
  const price = readlineSync.questionFloat("Enter the product price: ");
  const stock = readlineSync.questionFloat("Enter the product stock: ");
  const category = readlineSync.question("Enter the product category: ");
  const barcode = readlineSync.question("Enter the product barcode: ");
  const status = readlineSync.question("Enter the product status: ");
  await productModule.add(name, description, price, stock, category, barcode, status);
  console.log('Product added successfully.');
}

async function promptUpdateProduct() {
  const updateProductId = readlineSync.questionInt("Enter the product ID to update: ");
  const name = readlineSync.question("Enter the new product name: ");
  const description = readlineSync.question("Enter the new product description: ");
  const price = readlineSync.questionFloat("Enter the new product price: ");
  const stock = readlineSync.questionFloat("Enter the new product stock: ");
  const category = readlineSync.question("Enter the new product category: ");
  const barcode = readlineSync.question("Enter the new product barcode: ");
  const status = readlineSync.question("Enter the new product status: ");
  await productModule.update(updateProductId, name, description, price, stock, category, barcode, status);
  console.log('Product updated successfully.');
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

async function manageCustomers() {
  while (true) {
    console.log(`
      Customer Management:
      1. List Customers
      2. Add Customer
      3. Update Customer
      4. Delete Customer
      0. Back to Main Menu
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
        await promptUpdateCustomer();
        break;
      case "4":
        const deleteCustomerId = readlineSync.questionInt("Enter the customer ID to delete: ");
        await customerModule.destroy(deleteCustomerId);
        console.log('Customer deleted successfully.');
        break;
      case "0":
        return; // Go back to the main menu
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

async function manageProducts() {
  while (true) {
    console.log(`
      Product Management:
      1. List Products
      2. Add Product
      3. Update Product
      4. Delete Product
      0. Back to Main Menu
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        console.table(await productModule.get());
        break;
      case "2":
        await promptAddProduct();
        break;
      case "3":
        await promptUpdateProduct();
        break;
      case "4":
        const deleteProductId = readlineSync.questionInt("Enter the product ID to delete: ");
        await productModule.destroy(deleteProductId);
        console.log('Product deleted successfully.');
        break;
      case "0":
        return; // Go back to the main menu
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

async function manageOrders() {
  while (true) {
    console.log(`
      Order Management:
      1. Create Order
      2. List Orders
      0. Back to Main Menu
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        await promptAddOrder();
        break;
      case "2":
        console.table(await orderModule.getOrders());
        break;
      case "0":
        return; // Go back to the main menu
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

async function managePayments() {
  // Implement your payment management logic here
  console.log("Payment management not yet implemented.");
}

async function mainMenu() {
  while (true) {
    console.log(`
      Main Menu:
      1. Customer Management
      2. Product Management
      3. Order Management
      4. Payment Management
      0. Exit
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        await manageCustomers();
        break;
      case "2":
        await manageProducts();
        break;
      case "3":
        await manageOrders();
        break;
      case "4":
        await managePayments();
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
