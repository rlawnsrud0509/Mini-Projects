import React from "react";
import classNames from "classnames";
import {
  useChangeTodolistStateMutation,
  useDeleteTodolistMutation,
} from "../api/service";

const Todo = ({ id, title, completed, index }) => {
  const { deleteTodolistMutate } = useDeleteTodolistMutation(id);
  const { changeTodolistStateMutate } = useChangeTodolistStateMutation(
    completed,
    id
  );

  console.log(id, title, completed, "wefewf");
  return (
    <div
      className={classNames(
        "flex items-center justify-between w-[36rem] bg-white text-black font-regular p-1 box-border border-[2px] border-black rounded-sm",
        completed && "bg-green-500"
      )}
    >
      <div>{index + 1}번째로 할꺼</div>
      <div>{title}</div>
      <div className="flex">
        <div
          onClick={() => {
            changeTodolistStateMutate();
          }}
          className="w-[2rem] h-[2rem] text-[0.5rem] cursor-pointer flex justify-center items-center border-[1px] bg-white border-black rounded-sm"
        >
          {completed ? "안했음" : "완료!"}
        </div>
        <div
          onClick={() => deleteTodolistMutate()}
          className="w-[2rem] h-[2rem] flex justify-center cursor-pointer items-center border-[1px] border-black bg-white text-red-500 rounded-sm"
        >
          X
        </div>
      </div>
    </div>
  );
};

export default Todo;
