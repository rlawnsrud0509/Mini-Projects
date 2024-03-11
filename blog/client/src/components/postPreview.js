import axios from "axios";
import React from "react";

const PostPreview = ({
  id,
  title,
  author,
  craete_at,
  detail,
  setPage,
  setId,
  setResponse,
  setAuthor,
  setContent,
  setTitle,
}) => {
  const deletePost = () => {
    axios.delete(`http://localhost:8080/post/${id}`).then((res) => {
      alert("성공적으로 삭제되었습니다!!");
      setResponse(res);
    });
  };

  return (
    <div
      onClick={() => {
        setPage("view");
        setId(id);
      }}
      className="bg-white text-black w-[70%] h-[4rem] border-[0.125rem] cursor-pointer border-black flex items-center justify-between pr-5 pl-5 box-border text-[1.25rem] font-semibold transition-[ease-in-out_0.2s] hover:opacity-90"
    >
      <div className="flex gap-4 items-center">
        <div>{title}</div>
        <div className="text-[0.85rem]">{author}</div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-[0.75rem]">{craete_at.substring(0, 10)}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deletePost();
          }}
          className=" bg-red-500 text-white text-[0.9rem] p-1 rounded-sm hover:bg-red-400 transition-[ease-in-out_0.2s]"
        >
          삭제
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAuthor(author);
            setContent(detail);
            setTitle(title);
            setPage("update");
          }}
          className=" bg-blue-500 text-white text-[0.9rem] p-1 rounded-sm hover:bg-blue-400 transition-[ease-in-out_0.2s]"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default PostPreview;
