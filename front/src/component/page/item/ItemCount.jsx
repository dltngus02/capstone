import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
<<<<<<< HEAD
import Axios from 'axios';
import "./css/ItemCounter.css";
const ItemCount = ({ mockData,allData }) => {
=======
<<<<<<< HEAD
import "./css/ItemCounter.css";
const ItemCount = ({ mockData }) => {
=======
import Axios from 'axios';
import "./css/ItemCounter.css";
const ItemCount = ({ mockData,allData }) => {
>>>>>>> origin/master
>>>>>>> origin/master
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();

  const sumAmount = mockData.reduce((total, data) => total + data.amount, 0);
  const sumPrice = mockData.reduce(
    (total, data) => total + data.price * data.amount,
    0
  );
<<<<<<< HEAD
  const jsonData = JSON.stringify(allData, null, 2);

  const sendDataToFlask = async () => {
    try {
      onClickPay()
      console.log("찍히나")
      console.log(allData)
      const response = await Axios.get('http://127.0.0.1:5000', jsonData);
      console.log(response.data); // Flask 서버에서 전달된 응답 데이터 출력
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };
=======
<<<<<<< HEAD
>>>>>>> origin/master
  return (
    <>
      <hr />
      <div className="counterBack" >
        <div className="counterButton">
          <div className="numContainer">
            <div className="numdiv">
            <p className="allAmount">수량</p>
            <p className="sumAmount">{sumAmount}개</p>
            </div>
          </div>
          <div className="priceContainer">
<<<<<<< HEAD
=======
            <p className="allPrice"> 총 금액</p>
            <p className="sumPrice">{sumPrice}원</p>
            <button className="payButton" onClick={onClickPay}>
=======
  const jsonData = JSON.stringify(allData, null, 2);

  const sendDataToFlask = () => {
    fetch('/send_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allData),
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
      <hr />
      <div className="counterBack" >
        <div className="counterButton">
          <div className="numContainer">
            <div className="numdiv">
            <p className="allAmount">수량</p>
            <p className="sumAmount">{sumAmount}개</p>
            </div>
          </div>
          <div className="priceContainer">
>>>>>>> origin/master
              <div className="allsum">
                <p className="allPrice"> 총 금액</p>
                <p className="sumPrice">{sumPrice}원</p>
              </div>
            <button className="payButton" onClick={sendDataToFlask} >
<<<<<<< HEAD
=======
>>>>>>> origin/master
>>>>>>> origin/master
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCount;
