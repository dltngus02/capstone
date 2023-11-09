import React, { useEffect, useReducer, useCallback, useState } from "react";
import "./css/DonePage.css"
import { useNavigation } from "../Router/Router";
const DonePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  return (
    <>
      <header>
      <div className="Header2">
              <div className="goods2">1. 상품확인</div>
              <div className="pay2">2. 결제 방법</div>
              <div className="done2">3. 결제 완료</div>
            </div>
      </header>
      <div className="background">
        <div className="string">
          결제가 완료되었습니다! 안녕히가세요
        </div>
     
      </div>
    </>
  );
};
export default DonePage;
