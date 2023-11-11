import React, { useEffect, useReducer, useCallback, useState } from "react";
import "./css/HomePage.css";
import { useNavigation } from "../Router/Router";
const HomePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  return (
    <>
      <button className="ownerCall" onClick={onClickOwner}>
        직원 호출버튼
      </button>
      <div className="selfCounter">무인 계산대</div>

      <button className="start" onClick={onClickStart}>
        시작하기
      </button>
      <div className="back"></div>
      <div className="img"></div>
    </>
  );
};
export default HomePage;
