import React, { useEffect, useReducer, useCallback, useState } from "react";
import "./css/HomePage.css";
import { useNavigation } from "../Router/Router";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
const HomePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
    const navigate = useNavigate();
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
  const handleButtonClick = () => {
    window.location.href = 'http://127.0.0.1:5000/admin/login';
  };
  const handleButtonClickStart = () => {
    onClickStart()
    window.location.href = 'http://127.0.0.1:5000/get_products';
  };
  return (
    <>
      <button className="ownerCall" onClick={handleButtonClick}>
        직원 로그인
      </button>
      <div className="selfCounter">무인 계산대</div>

      <button className="start" onClick={handleButtonClickStart}>
        시작하기
      </button>
      <div className="back"></div>
      <div className="img"></div>
    </>
  );
};
export default HomePage;
