import axiosClient from "./index";

export const driver = async () => {
  return axiosClient.get("/driver");
};
export const user = async () => {
  return axiosClient.get("/user");
};
export const bookingList = async () => {
  return axiosClient.get("/booking/list");
};

export const driverDetail = async (id) => {
  return axiosClient.get(`/driver/?id=${id}`);
};

export const verifiedDriver = async (id, payload) => {
  return axiosClient.put(`/driver/${id}`, payload);
};
