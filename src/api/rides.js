import axiosClient from ".";

export const getAllRides = async () => {
  return axiosClient.get("/booking/list");
};

export const deleteRide = async (id) => {
  return axiosClient.delete(`/booking/${id}`);
};
