import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getRestaurant,
  postReservation,
  getReservation,
  deleteReservation,
  updateStarpoint,
  getStarpoint,
} from "./api";

//이번엔 Query 와 Mutation 들을 붙여서~!!!
export const useGetReastaurantQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ["getRestaurant"],
    queryFn: () => getRestaurant(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { restaurantData: data, ...restQuery };
};

export const useGetReservationQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ["getReservation"],
    queryFn: () => getReservation(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { reservationData: data, ...restQuery };
};

export const useGetStarpointQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ["getStarpoint"],
    queryFn: () => getStarpoint(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { starpointData: data, ...restQuery };
};

export const usePostReservationMutation = (reservation) => {
  const queryClient = useQueryClient();

  const { mutate: postReservationMutate, ...restMutation } = useMutation({
    mutationFn: () => postReservation(reservation),
    onSuccess: () => {
      alert("예약되었어요!!!");
      queryClient.invalidateQueries(["getReservation"]);
    },
  });

  return { postReservationMutate, ...restMutation };
};

export const useUpdateStarpointMutation = (id, starpoint) => {
  const queryClient = useQueryClient();

  const { mutate: updateStarpointMutate, ...restMutation } = useMutation({
    mutationFn: () => updateStarpoint(id, starpoint),
    onSuccess: () => {
      alert("별점을 추가햇어요!!!");
      queryClient.invalidateQueries(["getStarpoint"]);
    },
  });

  return { updateStarpointMutate, ...restMutation };
};

export const useDeleteReservationMutation = (rid) => {
  const queryClient = useQueryClient();

  const { mutate: deleteReservationMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteReservation(rid),
    onSuccess: () => {
      alert("예약을 취소햇어요!!");
      queryClient.invalidateQueries(["getReservation"]);
    },
  });

  return { deleteReservationMutate, ...restMutation };
};
