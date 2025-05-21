export function processPayment(orderDetails) {
  console.log("Mock payment processed for order:", orderDetails);
  return {
    status: "success",
    transactionId: `txn_${Date.now()}`
  };
}

