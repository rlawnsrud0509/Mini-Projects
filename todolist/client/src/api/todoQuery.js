import { instance } from "./instance";

export const getTodo = async () => {
  const data = await instance.get("/todos");

  return { data };
};

export const postTodo = async (text) => {
  const data = instance.post("/todos", { title: text });
  return { data };
};

export const putTodo = async (complete, id) => {
  const data = await instance.put(`/todos/${id}`, { complete });

  return { data };
};

export const deleteTodo = async (id) => {
  await instance.delete(`/todos/${id}`);
};
