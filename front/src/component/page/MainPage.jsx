import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../Router/Router";
import Item from "./item/Item";
const MainPage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();

  return (
    <>
      <header>
        <div>
          <div>1. 상품확인</div>
          <div>2. 결제 방법</div>
          <div>3. 결제 완료</div>
        </div>
      </header>
      <div>
        <div>No</div>
        <div>상품명</div>
        <div>수량</div>
        <div>가격</div>
      </div>
      <Item></Item>
    </>
  );
};
export default MainPage;
