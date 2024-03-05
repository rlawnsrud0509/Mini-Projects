import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodo, postTodo, putTodo } from "./todoQuery";

export const usePostTodolistMutation = (text) => {
  const queryClient = useQueryClient();

  const { mutate: postTotolistMutate, ...restMutation } = useMutation({
    mutationFn: () => postTodo(text),
    onSuccess: () => {
      alert("추가성고옹~!!");
      queryClient.invalidateQueries(["getTodo"]);
    },
  });

  return { postTotolistMutate, ...restMutation };
};

export const useGetTodolistQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ["getTodo"],
    queryFn: () => getTodo(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, ...restQuery };
};

export const useChangeTodolistStateMutation = (complete, id) => {
  const queryClient = useQueryClient();

  const { mutate: changeTodolistStateMutate, ...restMutation } = useMutation({
    mutationFn: () => putTodo(complete, id),
    onSuccess: () => {
      if (complete) alert("아직 끝마치지 않았나요?? 더 정진하세요");
      else alert("이번에도 무사히 과제를 끝마쳤군요!!!");
      queryClient.invalidateQueries(["getTodo"]);
    },
  });

  return { changeTodolistStateMutate, ...restMutation };
};

export const useDeleteTodolistMutation = (id) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodolistMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      alert("삭제성고옹~!!");
      queryClient.invalidateQueries(["getTodo"]);
    },
  });

  return { deleteTodolistMutate, ...restMutation };
};
