import { useEffect, useState } from "react";
import Todo from "./components/todo";
import {
  useDeleteTodolistMutation,
  useGetTodolistQuery,
  usePostTodolistMutation,
} from "./api/service";

function App() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState();

  const { postTotolistMutate } = usePostTodolistMutation(text);
  const { data } = useGetTodolistQuery();

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-scroll flex flex-col items-center relative p-10 bg-slate-300">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-[3rem] font-regular">김준경의 Todolist</h1>
        <div className="flex justify-between w-full relative">
          <input
            className="border-[2px] h-[4rem] w-[30rem] p-5 border-black outline-none"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div
            onClick={() => {
              postTotolistMutate();
              setText("");
            }}
            className="h-[4rem] w-[6rem] text-[1rem] cursor-pointer flex justify-center items-center rounded-sm bg-green-400 border-[2px] border-black"
          >
            추가하기
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5 gap-1">
        {data &&
          data.data.data.map((e, i) => {
            return (
              <Todo
                id={e.id}
                index={i}
                title={e.content}
                completed={e.completed}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
