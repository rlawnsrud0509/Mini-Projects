import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

export const getRestaurant = async () => {
  const data = await instance.get("restaurant");
  return { data };
};

export const getReservation = async () => {
  const data = await instance.get("reservation");
  return { data };
};

export const postReservation = async (reservation) => {
  const data = await instance.post("reservation", reservation);
  return { data };
};

export const updateStarpoint = async (id, starpoint) => {
  const data = await instance.put("starpoint", { id, starpoint });
  return { data };
};

export const deleteReservation = async (id) => {
  const data = await instance.delete(`reservation/${id}`);
  return { data };
};
