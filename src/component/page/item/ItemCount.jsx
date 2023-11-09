import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import "./css/ItemCounter.css";
const ItemCount = ({ mockData }) => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();

  const sumAmount = mockData.reduce((total, data) => total + data.amount, 0);
  const sumPrice = mockData.reduce(
    (total, data) => total + data.price * data.amount,
    0
  );
  return (
    <>
      <hr />
      <div className="counterBack">
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
            <button className="payButton" onClick={onClickPay}>
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCount;
