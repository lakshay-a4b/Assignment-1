import { addPayment } from "../repositories/PaymentRepository.js";

export const createPayment = async (orderDetails, client = null) => {
  try {
    const paymentId = `pay_${Date.now()}`;
    const { userId, totalAmount } = orderDetails;
    
    const status = "success";
    const paymentData = {
      paymentId,
      userId,
      totalAmount,
      status,
    };

    const result = client 
      ? await addPayment(paymentData, client) 
      : await addPayment(paymentData);
    
    if (!result) {
      throw new Error("Payment creation failed");
    }

    return {
      status: "success",
      transactionId: paymentId,
    };
  } catch (error) {
    console.error("Payment service error:", error);
    throw error;
  }
};