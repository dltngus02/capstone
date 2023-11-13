import React, { useEffect, useReducer, useCallback, useState } from "react";
<<<<<<< HEAD
import {dispatch} from "./item/Item"
import { useNavigation } from "../Router/Router";
import "./css/PayPage.css"
import Axios from 'axios';
=======
<<<<<<< HEAD

import { useNavigation } from "../Router/Router";
=======
import {dispatch} from "./item/Item"
import { useNavigation } from "../Router/Router";
import "./css/PayPage.css"
import Axios from 'axios';
>>>>>>> origin/master
>>>>>>> origin/master
const PayPage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  return (
<<<<<<< HEAD
    <div className="wrapper1">
          <header>
            <div className="Header1">
              <div className="goods1">1. 상품확인</div>
              <div className="pay1">2. 결제 방법</div>
              <div className="done1">3. 결제 완료</div>
            </div>
          </header>
      <div className="wrapper">
        <div className="txt">결제 수단을 선택해주세요</div>
        <div className="selectCash">
          <button className="cash" onClick={onClickDone}>현금</button>
          <button className="card"  onClick={onClickDone}>카드</button>
        </div>
      </div>
    </div>
=======
<<<<<<< HEAD
    <>
      <header>
        <div>
          <div>1. 상품확인</div>
          <div>2. 결제 방법</div>
          <div>3. 결제 완료</div>
        </div>
      </header>

      <div>결제수단을 선택해주세요</div>
      <div>
        <div>
          <button onClick={onClickDone}>현금</button>
        </div>
        <div>
          <button onClick={onClickDone}>카드</button>
        </div>
      </div>
    </>
=======
    <div className="wrapper1">
          <header>
            <div className="Header1">
              <div className="goods1">1. 상품확인</div>
              <div className="pay1">2. 결제 방법</div>
              <div className="done1">3. 결제 완료</div>
            </div>
          </header>
      <div className="wrapper">
        <div className="txt">결제 수단을 선택해주세요</div>
        <div className="selectCash">
          <button className="cash" onClick={onClickDone}>현금</button>
          <button className="card"  onClick={onClickDone}>카드</button>
        </div>
      </div>
    </div>
>>>>>>> origin/master
>>>>>>> origin/master
  );
};
export default PayPage;
