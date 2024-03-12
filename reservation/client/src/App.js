import { useState } from "react";
import {
  useDeleteReservationMutation,
  useGetReastaurantQuery,
  useGetReservationQuery,
  usePostReservationMutation,
  useUpdateStarpointMutation,
} from "./service/query&mutate";
import { flushSync } from "react-dom";
import classNames from "classnames";

function App() {
  const [showReservationWindow, setShowReservationWindow] = useState(false);
  const [showStarpointWindow, setShowStarpointWindow] = useState(false);
  const [reservationFormdata, setReservationFormdata] = useState({
    rid: "",
    rname: "",
    rnumber: "",
    id: "",
    name: "",
    address: "",
  });
  const [starpoint, setStarpoint] = useState(0);

  const { restaurantData } = useGetReastaurantQuery();
  const { reservationData } = useGetReservationQuery();
  const { postReservationMutate } =
    usePostReservationMutation(reservationFormdata);
  const { updateStarpointMutate } = useUpdateStarpointMutation(
    reservationFormdata.id,
    starpoint
  );
  const { deleteReservationMutate } = useDeleteReservationMutation(
    reservationFormdata.rid
  );

  return (
    <div className="w-[100vw] min-h-[100vh] bg-lime-100 text-white font-semibold flex flex-col items-center gap-20 p-10">
      <div className="flex gap-6">
        {restaurantData &&
          restaurantData.data.data.map((e) => (
            <div
              className={classNames(
                "flex flex-col gap-2 items-center text-[1.25rem] w-[250px] h-[150px] border-[3px] border-black rounded-lg text-black justify-center transition-[ease-in-out_0.2s] hover:scale-[1.03]",
                //증말 구현하고싶은 기능이잇는데 안떠올라서 4중 삼항연산자를 도입하겟다 껄껄껄
                e.starpoint / 2 >= 75
                  ? "bg-yellow-300"
                  : e.starpoint / 2 >= 50
                  ? "bg-yellow-200"
                  : e.starpoint / 2 >= 25
                  ? "bg-yellow-100"
                  : e.starpoint / 2 >= 0
                  ? "bg-yellow-50"
                  : "bg-white"
              )}
            >
              <div className="text-[1.25rem]"> {e.name}</div>
              <div className="text-[0.9rem]"> {e.address}</div>
              <div className="text-[0.6rem]">별점 {e.starpoint}</div>
              <div className="flex gap-4">
                <div
                  onClick={() => {
                    setShowReservationWindow(true);
                    setReservationFormdata({
                      ...reservationFormdata,
                      id: e.id,
                      name: e.name,
                      address: e.address,
                    });
                  }}
                  className="text-[0.8rem] p-1.5 text-white bg-blue-300 rounded-sm transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.05]"
                >
                  예약하기
                </div>
                <div
                  onClick={() => {
                    setShowStarpointWindow(true);
                    setReservationFormdata({
                      ...reservationFormdata,
                      id: e.id,
                      name: e.name,
                      address: e.address,
                    });
                  }}
                  className="text-[0.8rem] p-1.5 text-white bg-yellow-400 rounded-sm transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.05]"
                >
                  별점주기
                </div>
              </div>
            </div>
          ))}
      </div>
      {showReservationWindow && (
        <div className="flex flex-col items-center gap-2 w-full h-[20rem] relative box-border">
          <div
            onClick={() => setShowReservationWindow(false)}
            className="absolute right-0 p-[0.75rem_1.2rem] rounded-sm bg-red-400 transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.05]"
          >
            X
          </div>
          <div className="text-[2rem] font-semibold">예약 창</div>
          <div className="flex flex-col gap-5 w-full p-10 box-border bg-white ">
            <input
              className="outline-none text-black p-4 bg-slate-100 rounded-sm"
              placeholder="이름을 적어주세요."
              type="text"
              onChange={(e) => {
                setReservationFormdata({
                  ...reservationFormdata,
                  rname: e.target.value,
                });
              }}
            />
            <input
              placeholder="전화번호를 적어주세요."
              className="outline-none text-black p-4 bg-slate-100 rounded-sm"
              type="text"
              onChange={(e) => {
                setReservationFormdata({
                  ...reservationFormdata,
                  rnumber: e.target.value,
                });
              }}
            />
            <div
              onClick={() => {
                postReservationMutate();
                setShowReservationWindow(false);
              }}
              className="text-[1.25rem] p-5 text-center text-white bg-blue-300 rounded-sm transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.01]"
            >
              예약하기
            </div>
          </div>
        </div>
      )}
      {showStarpointWindow && (
        <div className="flex flex-col items-center gap-2 w-full h-[20rem] relative box-border">
          <div
            onClick={() => setShowStarpointWindow(false)}
            className="absolute right-0 p-[0.75rem_1.2rem] rounded-sm bg-red-400 transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.05]"
          >
            X
          </div>
          <div className="text-[2rem] font-semibold">별점 주는 창</div>
          <div className="flex flex-col gap-5 w-full p-10 box-border bg-white ">
            <input
              className="outline-none text-black p-4 bg-slate-100 rounded-sm"
              placeholder="당신의 별점은~~!!!"
              type="text"
              onChange={(e) => {
                setStarpoint(+e.target.value);
              }}
            />
            <div
              onClick={() => {
                updateStarpointMutate();
                setShowStarpointWindow(false);
              }}
              className="text-[1.25rem] p-5 text-center text-white bg-blue-300 rounded-sm transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.01]"
            >
              별점주기
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-5 w-[70%]">
        {reservationData &&
          reservationData.data.data.map((e) => {
            return (
              <div className="w-[14rem] h-[14rem] drop-shadow-lg rounded-lg flex flex-col gap-4 p-5 box-border items-center bg-white text-gray-800 relative transition-[ease-in-out_0.1s] hover:scale-[1.02]">
                <div
                  onClick={() => {
                    flushSync(() => {
                      setReservationFormdata({
                        ...reservationFormdata,
                        rid: e.rid,
                      });
                    });
                    deleteReservationMutate();
                  }}
                  className="absolute w-fit h-fit p-1 rounded-sm bg-red-400 text-[0.7rem] bottom-0 right-0 text-white transition-[ease-in-out_0.1s] cursor-pointer hover:scale-[1.04]"
                >
                  예약 취소
                </div>
                <div className="text-[1.4rem] font-normal">예약 정보</div>
                <div className="flex w-full justify-between items-center font-normal">
                  <div className="text-[1rem]">{e.name} :</div>
                  <div className="text-[0.7rem]">{e.address}</div>
                </div>
                <div className="flex flex-col gap-0 font-normal">
                  <div className="text-[0.8rem]">예약자명 : {e.rname}</div>
                  <div className="text-[0.8rem]">전화번호 : {e.rnumber}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
