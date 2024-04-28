import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../Router/Router";
import Item from "./item/Item";
import "./css/MainPage.css";
const MainPage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain, onClickRec } =
    useNavigation();

  return (
      <div className="되라">
        
          <header>
            <div className="Header">
              <div className="goods">1. 상품확인</div>
              <div className="pay">2. 결제 방법</div>
              <div className="done">3. 결제 완료</div>
            </div>
          </header>
          <div className="main">
            <div className="no">No</div>
            <div className="pic">사진</div>
            <div className="name">상품명</div>
            <div className="number">수량</div>
            <div className="price">가격</div>
          </div>
          <div className="item">
            <Item></Item>
          </div>

      </div>

  );
};
export default MainPage;
