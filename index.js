const readlineSync = require('readline-sync');

const customerModule = require('./src/customer');
const productModule = require('./src/product');
const paymentModule = require('./src/payment');
const orderModule = require('./src/order');

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

async function promptAddPayment() {
  const order_id = readlineSync.question("Enter the order ID: ");
  const date = readlineSync.question("Enter the payment date: ");
  const amount = readlineSync.questionFloat("Enter the payment amount: ");
  const payment_method = readlineSync.question("Enter the payment method: ");
  await paymentModule.add(order_id, date, amount, payment_method);
  console.log('Payment added successfully.');
}

async function promptUpdatePayment() {
  const updatePaymentId = readlineSync.questionInt("Enter the payment ID to update: ");
  const order_id = readlineSync.question("Enter the new order ID: ");
  const date = readlineSync.question("Enter the new payment date: ");
  const amount = readlineSync.questionFloat("Enter the new payment amount: ");
  const payment_method = readlineSync.question("Enter the new payment method: ");
  await paymentModule.update(updatePaymentId, order_id, date, amount, payment_method);
  console.log('Payment updated successfully.');
}


async function promptAddOrder() {
  const order_date = readlineSync.question("Enter the order date: ");
  const customer_id = readlineSync.questionInt("Enter the customer ID: ");
  const delivery_address = readlineSync.question("Enter the delivery address: ");
  const track_number = readlineSync.question("Enter the tracking number: ");
  const status = readlineSync.question("Enter the order status: ");
  

  const orderId = await orderModule.addOrder(order_date, customer_id, delivery_address, track_number, status);
  console.log('Order added successfully.');

  
  while (true) {
    console.log("Now, let's add order details.");
    const product_id = readlineSync.questionInt("Enter the product ID: ");
    const quantity = readlineSync.questionInt("Enter the quantity: ");
    const price = readlineSync.questionFloat("Enter the price: ");

     
    const action = readlineSync.question("Type 'save' to save and finish or 'exit' to add another detail: ");
    if (action.toLowerCase() === 'save') {
      console.log('Order and details saved successfully.');
      break;
    } else if (action.toLowerCase() !== 'exit') {
      console.log('Invalid choice, try again.');
    }
  }
}

async function promptUpdateOrder() {
  const updateOrderId = readlineSync.questionInt("Enter the order ID to update: ");
  const order_date = readlineSync.question("Enter the new order date: ");
  const customer_id = readlineSync.questionInt("Enter the new customer ID: ");
  const delivery_address = readlineSync.question("Enter the new delivery address: ");
  const track_number = readlineSync.question("Enter the new tracking number: ");
  const status = readlineSync.question("Enter the new order status: ");
  await orderModule.updateOrder(updateOrderId, order_date, customer_id, delivery_address, track_number, status);
  console.log('Order updated successfully.');
}
async function manageCustomers() {
  while (true) {
    console.log(`
      Customer Management:
      1. Add Customer
      2. List Customers
      3. Update Customer
      4. Delete Customer
      0. Back to Main Menu
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        await promptAddCustomer();
        break;
      case "2":
        console.table(await customerModule.get());
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
        return; 
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
      1. Add Product
      2. List Products
      3. Update Product
      4. Delete Product
      0. Back to Main Menu
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        await promptAddProduct();
        break;
      case "2":
        console.table(await productModule.get());
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
        return; 
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}
async function managePayments() {
  while (true) {
    console.log(`
      Payment Management:
      1. Add Payment
      2. List Payments
      3. Update Payment
      4. Delete Payment
      0. Back to Main Menu
    `);

    const choice = readlineSync.question("Choose an option: ");
    switch (choice) {
      case "1":
        await promptAddPayment();
        break;
      case "2":
        console.table(await paymentModule.get());
        break;
      case "3":
        await promptUpdatePayment();
        break;
      case "4":
        const deletePaymentId = readlineSync.questionInt("Enter the payment ID to delete: ");
        await paymentModule.destroy(deletePaymentId);
        console.log('Payment deleted successfully.');
        break;
      case "0":
        return; 
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
      1. Add Order
      2. List Orders
      3. Update Order
      4. Delete Order
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
      case "3":
        await promptUpdateOrder();
        break;
        case "4":
          const deleteOrderId = readlineSync.questionInt("Enter the order ID to delete: ");
          await orderModule.destroyOrder(deleteOrderId); 
          console.log('Order deleted successfully.');
          break;
      case "0":
        return; 
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

async function mainMenu() {
  while (true) {
    console.log(`
      Main Menu:
      1. Customer Management
      2. Product Management
      3. Payment Management
      4. Order Management
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
        await managePayments();
        break;
      case "4":
        await manageOrders();
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