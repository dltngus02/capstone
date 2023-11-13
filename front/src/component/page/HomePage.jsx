import React, { useEffect, useReducer, useCallback, useState } from "react";
import "./css/HomePage.css";
import { useNavigation } from "../Router/Router";
import io from 'socket.io-client';
const HomePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
    const callAdmin = () => {
      fetch('/admin/call', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
        })
        .catch(error => {
          console.log(error);
        });
    };
  return (
    <>
      <button className="ownerCall" onClick={callAdmin}>
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
