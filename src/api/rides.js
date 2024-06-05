import axiosClient from ".";

export const getAllRides = async () => {
  return axiosClient.get("/booking/list");
};
