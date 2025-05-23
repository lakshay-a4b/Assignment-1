import { addPayment } from "../repositories/PaymentRepository.js";
export const processPayment = async (orderDetails) => {
  const paymentId = `pay_${Date.now()}`;
  const { userId, totalAmount } = orderDetails;
  
  const status = "success";
  const paymentData = {
    paymentId,
    userId,
    totalAmount,
    status,
  };

  const result = await addPayment(paymentData);
  
  return {
    status: "success",
    transactionId: paymentId,
  };
};
