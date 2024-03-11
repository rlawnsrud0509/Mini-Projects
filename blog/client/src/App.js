import { useEffect, useState } from "react";
import axios from "axios";
import PostPreview from "./components/postPreview";

function App() {
  const [page, setPage] = useState("wholeview");
  const [id, setId] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [response, setResponse] = useState({});
  const [postArray, setPostArray] = useState([]);

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + (date.getDate() + 1)).slice(-2);
  const dateStr = `${year}-${month}-${day}`;

  const getPost = () => {
    axios
      .get("http://localhost:8080/post")
      .then((res) => setPostArray(res.data));
  };

  const createPost = () => {
    axios
      .post("http://localhost:8080/post", {
        title,
        content,
        author,
        date: dateStr,
      })
      .then((res) => setResponse(res));
  };

  const updatePost = () => {
    axios
      .put("http://localhost:8080/post", {
        id,
        title,
        content,
        author,
        date: dateStr,
      })
      .then((res) => setResponse(res));
  };

  useEffect(() => {
    getPost();
  }, [response]);

  return (
    <>
      {page === "wholeview" ? (
        <main className="w-[100vw] h-[100vh] pb-20 overflow-scroll relative flex flex-col gap-10 items-center box-border text-white bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 scrollbar-hide">
          <nav className="flex items-center justify-center gap-10 w-full p-[1.58rem] bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            <div className="text-[1.2rem]">어서와용</div>
            <h1 className="text-[2.5rem] font-semibold">준경 블로그</h1>
            <div className="text-[1.2rem]">반가워용</div>
          </nav>
          <button
            onClick={() => {
              setPage("write");
            }}
            className="outline-none bg-violet-200 text-black pr-6 pl-6 p-3 rounded-sm font-semibold text-[1.25rem]"
          >
            글쓰기
          </button>
          <section className="flex flex-col w-full h-full items-center">
            <div className="bg-white text-violet-950 w-[70%] h-[8rem] border-[0.125rem] border-black rounded-t-md flex items-center justify-center text-[1.75rem] font-semibold">
              글 목록
            </div>
            {postArray.length
              ? postArray.map((e) => {
                  return (
                    <PostPreview
                      id={e.id}
                      title={e.title}
                      author={e.author}
                      craete_at={e.craete_at}
                      detail={e.content}
                      setPage={setPage}
                      setId={setId}
                      setResponse={setResponse}
                      setAuthor={setAuthor}
                      setTitle={setTitle}
                      setContent={setContent}
                    />
                  );
                })
              : null}
          </section>
        </main>
      ) : page === "write" ? (
        <main className="w-[100vw] h-[100vh] relative flex flex-col gap-10 items-center box-border text-white bg-green-950 scrollbar-hide">
          <nav className="flex items-center justify-center gap-10 w-full h-[10rem] bg-green-950">
            <div className="text-[1.2rem]">어서와용</div>
            <h1 className="text-[2.5rem] font-semibold">준경 블로그</h1>
            <div className="text-[1.2rem]">반가워용</div>
          </nav>
          <button
            onClick={() => {
              setPage("wholeview");
              setTitle("");
              setAuthor("");
              setContent("");
            }}
            className="outline-none bg-violet-200 text-black pr-6 pl-6 p-3 rounded-sm font-semibold text-[1.25rem]"
          >
            뒤로가기
          </button>
          <section className="flex flex-col gap-5 w-full h-full items-center relative">
            <div className="bg-white text-violet-950 w-[70%] h-[20%] border-[0.125rem] border-black rounded-md flex items-center justify-center text-[1.75rem] font-semibold">
              글 쓰기
            </div>
            <input
              className="w-[70%] rounded-sm p-4 bg-white border-[0.125rem] border-black outline-none text-black"
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              className="w-[70%] rounded-sm p-4 bg-white border-[0.125rem] border-black outline-none text-black"
              type="text"
              placeholder="작성자를 입력해주세요."
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <textarea
              className="w-[70%] rounded-sm h-[30%] resize-none p-4 bg-white border-[0.125rem] border-black outline-none text-black"
              type="text"
              placeholder="내용을 입력해주세요."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setPage("wholeview");
                createPost();
                setTitle("");
                setAuthor("");
                setContent("");
              }}
              className="outline-none bg-violet-200 text-black pr-6 pl-6 p-3 rounded-sm font-semibold text-[1.25rem]"
            >
              출판
            </button>
          </section>
        </main>
      ) : page === "update" ? (
        <main className="w-[100vw] h-[100vh] relative flex flex-col gap-10 items-center box-border text-white bg-violet-950 scrollbar-hide">
          <nav className="flex items-center justify-center gap-10 w-full h-[10rem] bg-violet-700">
            <div className="text-[1.2rem]">어서와용</div>
            <h1 className="text-[2.5rem] font-semibold">준경 블로그</h1>
            <div className="text-[1.2rem]">반가워용</div>
          </nav>
          <button
            onClick={() => {
              setPage("wholeview");
              setTitle("");
              setAuthor("");
              setContent("");
            }}
            className="outline-none bg-violet-200 text-black pr-6 pl-6 p-3 rounded-sm font-semibold text-[1.25rem]"
          >
            뒤로가기
          </button>
          <section className="flex flex-col gap-5 w-full h-full items-center relative">
            <div className="bg-white text-violet-950 w-[70%] h-[20%] border-[0.125rem] border-black rounded-md flex items-center justify-center text-[1.75rem] font-semibold">
              글 수정
            </div>
            <input
              className="w-[70%] rounded-sm p-4 bg-white border-[0.125rem] border-black outline-none text-black"
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              className="w-[70%] rounded-sm p-4 bg-white border-[0.125rem] border-black outline-none text-black"
              type="text"
              placeholder="작성자를 입력해주세요."
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <textarea
              className="w-[70%] rounded-sm h-[30%] resize-none p-4 bg-white border-[0.125rem] border-black outline-none text-black"
              type="text"
              placeholder="내용을 입력해주세요."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setPage("wholeview");
                updatePost();
                setTitle("");
                setAuthor("");
                setContent("");
              }}
              className="outline-none bg-violet-200 text-black pr-6 pl-6 p-3 rounded-sm font-semibold text-[1.25rem]"
            >
              수정
            </button>
          </section>
        </main>
      ) : (
        <main className="w-[100vw] h-[100vh] pb-20 overflow-scroll relative flex flex-col gap-10 items-center box-border text-white bg-violet-950 scrollbar-hide">
          <nav className="flex items-center justify-center gap-10 w-full p-[1.58rem] bg-violet-700">
            <div className="text-[1.2rem]">어서와용</div>
            <h1 className="text-[2.5rem] font-semibold">준경 블로그</h1>
            <div className="text-[1.2rem]">반가워용</div>
          </nav>
          <button
            onClick={() => {
              setPage("wholeview");
            }}
            className="outline-none bg-violet-200 text-black pr-6 pl-6 p-3 rounded-sm font-semibold text-[1.25rem]"
          >
            뒤로가기
          </button>
          <section className="flex flex-col w-full h-full items-center">
            {postArray.length
              ? postArray.map((e) => {
                  if (id === e.id)
                    return (
                      <>
                        <div className="bg-white text-violet-950 w-[70%] h-[8rem] gap-6 border-[0.125rem] border-black rounded-md flex items-center justify-center text-[1.75rem] font-semibold">
                          {e.title}
                          <div className="text-[0.75rem]">{e.author}</div>
                        </div>
                        <pre className="bg-white whitespace-pre-wrap text-violet-950 w-[70%] p-8 h-fit border-[0.125rem] border-black rounded-md flex items-center text-[1rem] font-semibold font-['Roboto']">
                          {e.content}
                        </pre>
                      </>
                    );
                  return <></>;
                })
              : null}
          </section>
        </main>
      )}
    </>
  );
}

export default App;
