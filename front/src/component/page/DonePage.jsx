import React, { useEffect, useReducer, useCallback, useState } from "react";
<<<<<<< HEAD
import "./css/DonePage.css"
=======
<<<<<<< HEAD
=======
import "./css/DonePage.css"
>>>>>>> origin/master
>>>>>>> origin/master
import { useNavigation } from "../Router/Router";
const DonePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  return (
    <>
      <header>
<<<<<<< HEAD
      <div className="Header2">
              <div className="goods2">1. 상품확인</div>
              <div className="pay2">2. 결제 방법</div>
              <div className="done2">3. 결제 완료</div>
            </div>
      </header>
=======
<<<<<<< HEAD
        <div>
          <div>1. 상품확인</div>
          <div>2. 결제 방법</div>
          <div>3. 결제 완료</div>
        </div>
      </header>
      <div>결제가 완료되었습니다! 안녕히가세요</div>
      <button onClick={onClickMain}>처음으로</button>
=======
      <div className="Header2">
              <div className="goods2">1. 상품확인</div>
              <div className="pay2">2. 결제 방법</div>
              <div className="done2">3. 결제 완료</div>
            </div>
      </header>
>>>>>>> origin/master
      <div className="background">
        <div className="string">
          결제가 완료되었습니다! 안녕히가세요
        </div>
     
      </div>
<<<<<<< HEAD
=======
>>>>>>> origin/master
>>>>>>> origin/master
    </>
  );
};
export default DonePage;
