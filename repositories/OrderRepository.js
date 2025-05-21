export const orders = [];

export const addOrder = (order) => {
  orders.push(order);
};

export const getOrdersByUser = (userId) => {
  return orders.filter(order => order.userId === userId);
};

