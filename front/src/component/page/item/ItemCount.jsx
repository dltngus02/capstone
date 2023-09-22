import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
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
      <div>
        <div>
          <div>수량 {sumAmount}개</div>
          <div>총 금액 {sumPrice}원</div>
        </div>
        <button onClick={onClickPay}>결제하기</button>
      </div>
    </>
  );
};
export default ItemCount;
