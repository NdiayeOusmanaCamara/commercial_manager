const readlineSync = require('readline-sync');

const customerModule = require('./src/customer');
const productModule = require('./src/product');
const paymentModule = require('./src/payment');
const orderModule = require('./src/order');

// Helper function for input validation
function promptNonEmpty(question) {
  let answer;
  while (!answer) {
    answer = readlineSync.question(question);
    if (!answer.trim()) {
      console.log('Input cannot be empty. Please try again.');
      answer = '';
    }
  }
  return answer;
}

async function promptAddCustomer() {
  try {
    const name = promptNonEmpty("Enter the customer name: ");
    const address = promptNonEmpty("Enter the address: ");
    const email = promptNonEmpty("Enter the email: ");
    const phone = promptNonEmpty("Enter the phone number: ");
    await customerModule.add(name, address, email, phone);
  } catch (error) {
    console.error('Error adding customer:', error.message);
  }
}

async function promptUpdateCustomer() {
  try {
    const updateCustomerId = readlineSync.questionInt("Enter the customer ID to update: ");
    const name = promptNonEmpty("Enter the new customer name: ");
    const address = promptNonEmpty("Enter the new address: ");
    const email = promptNonEmpty("Enter the new email: ");
    const phone = promptNonEmpty("Enter the new phone number: ");
    await customerModule.update(updateCustomerId, name, address, email, phone);
  } catch (error) {
    console.error('Error updating customer:', error.message);
  }
}

async function promptAddProduct() {
  try {
    const name = promptNonEmpty("Enter the product name: ");
    const description = promptNonEmpty("Enter the product description: ");
    const price = readlineSync.questionFloat("Enter the product price: ");
    const stock = readlineSync.questionFloat("Enter the product stock: ");
    const category = promptNonEmpty("Enter the product category: ");
    const barcode = promptNonEmpty("Enter the product barcode: ");
    const status = promptNonEmpty("Enter the product status: ");
    await productModule.add(name, description, price, stock, category, barcode, status);
  } catch (error) {
    console.error('Error adding product:', error.message);
  }
}

async function promptUpdateProduct() {
  try {
    const updateProductId = readlineSync.questionInt("Enter the product ID to update: ");
    const name = promptNonEmpty("Enter the new product name: ");
    const description = promptNonEmpty("Enter the new product description: ");
    const price = readlineSync.questionFloat("Enter the new product price: ");
    const stock = readlineSync.questionFloat("Enter the new product stock: ");
    const category = promptNonEmpty("Enter the new product category: ");
    const barcode = promptNonEmpty("Enter the new product barcode: ");
    const status = promptNonEmpty("Enter the new product status: ");
    await productModule.update(updateProductId, name, description, price, stock, category, barcode, status);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
}

async function promptAddPayment() {
  try {
    const order_id = promptNonEmpty("Enter the order ID: ");
    const date = promptNonEmpty("Enter the payment date: ");
    const amount = readlineSync.questionFloat("Enter the payment amount: ");
    const payment_method = promptNonEmpty("Enter the payment method: ");
    await paymentModule.add(order_id, date, amount, payment_method);
  } catch (error) {
    console.error('Error adding payment:', error.message);
  }
}

async function promptUpdatePayment() {
  try {
    const updatePaymentId = readlineSync.questionInt("Enter the payment ID to update: ");
    const order_id = promptNonEmpty("Enter the new order ID: ");
    const date = promptNonEmpty("Enter the new payment date: ");
    const amount = readlineSync.questionFloat("Enter the new payment amount: ");
    const payment_method = promptNonEmpty("Enter the new payment method: ");
    await paymentModule.update(updatePaymentId, order_id, date, amount, payment_method);
  } catch (error) {
    console.error('Error updating payment:', error.message);
  }
}

async function promptAddOrder() {
  try {
    const date = promptNonEmpty("Enter the order date: ");
    const customer_id = readlineSync.questionInt("Enter the customer ID: ");
    const delivery_address = promptNonEmpty("Enter the delivery address: ");
    const track_number = promptNonEmpty("Enter the tracking number: ");
    const status = promptNonEmpty("Enter the order status: ");

    const orderId = await orderModule.addOrder(date, customer_id, delivery_address, track_number, status);
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
  } catch (error) {
    console.error('Error adding order:', error.message);
  }
}

async function promptUpdateOrder() {
  try {
    const updateOrderId = readlineSync.questionInt("Enter the order ID to update: ");
    const date = promptNonEmpty("Enter the new order date: ");
    const customer_id = readlineSync.questionInt("Enter the new customer ID: ");
    const delivery_address = promptNonEmpty("Enter the new delivery address: ");
    const track_number = promptNonEmpty("Enter the new tracking number: ");
    const status = promptNonEmpty("Enter the new order status: ");
    await orderModule.updateOrder(updateOrderId, date, customer_id, delivery_address, track_number, status);
  } catch (error) {
    console.error('Error updating order:', error.message);
  }
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
        try {
          console.table(await customerModule.get());
        } catch (error) {
          console.error('Error listing customers:', error.message);
        }
        break;
      case "3":
        await promptUpdateCustomer();
        break;
      case "4":
        try {
          const deleteCustomerId = readlineSync.questionInt("Enter the customer ID to delete: ");
          await customerModule.destroy(deleteCustomerId);
        } catch (error) {
          console.error('Error deleting customer:', error.message);
        }
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
        try {
          console.table(await productModule.get());
        } catch (error) {
          console.error('Error listing products:', error.message);
        }
        break;
      case "3":
        await promptUpdateProduct();
        break;
      case "4":
        try {
          const deleteProductId = readlineSync.questionInt("Enter the product ID to delete: ");
          await productModule.destroy(deleteProductId);
        } catch (error) {
          console.error('Error deleting product:', error.message);
        }
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
        try {
          console.table(await paymentModule.get());
        } catch (error) {
          console.error('Error listing payments:', error.message);
        }
        break;
      case "3":
        await promptUpdatePayment();
        break;
      case "4":
        try {
          const deletePaymentId = readlineSync.questionInt("Enter the payment ID to delete: ");
          await paymentModule.destroy(deletePaymentId);
        } catch (error) {
          console.error('Error deleting payment:', error.message);
        }
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
        try {
          console.table(await orderModule.getOrders());
        } catch (error) {
          console.error('Error listing orders:', error.message);
        }
        break;
      case "3":
        await promptUpdateOrder();
        break;
      case "4":
        try {
          const deleteOrderId = readlineSync.questionInt("Enter the order ID to delete: ");
          await orderModule.destroyOrder(deleteOrderId);
        } catch (error) {
          console.error('Error deleting order:', error.message);
        }
        break;
      case "0":
        return; 
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

async function main() {
  while (true) {
    console.log(`
      Main Menu:
      1. Manage Customers
      2. Manage Products
      3. Manage Payments
      4. Manage Orders
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
        console.log('Exiting the application.');
        process.exit();
      default:
        console.log('Invalid choice, try again.');
        break;
    }
  }
}

main();
