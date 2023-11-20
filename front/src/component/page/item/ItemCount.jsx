import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import Axios from 'axios';
import "./css/ItemCounter.css";
import { useNavigate } from 'react-router-dom';
const ItemCount = ({ mockData,allData }) => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();

  const sumAmount = mockData.reduce((total, data) => total + data.amount, 0);
  const sumPrice = mockData.reduce(
    (total, data) => total + data.price * data.amount,
    0
  );
  const jsonData = JSON.stringify(allData, null, 2);
  const navigate = useNavigate();
  const url = `/pay?amount=${sumPrice}`; 
  console.log(sumPrice)
  const sendDataToFlask = () => {
    navigate(url);
    fetch('/send_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
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
              <div className="allsum">
                <p className="allPrice"> 총 금액</p>
                <p className="sumPrice">{sumPrice}원</p>
              </div>
              <button className="payButton" onClick={sendDataToFlask} >
                  결제하기
                </button>
 
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCount;
