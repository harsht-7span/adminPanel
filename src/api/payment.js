import axiosClient from ".";

export const getAllPayment = async () => {
  return axiosClient.get("/payment");
};

export const totalRevenue = async () => {
  return axiosClient.get("/payment/revenue");
};

export const totalBooking = async () => {
  return axiosClient.get("/payment/total");
};
