import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../Router/Router";
const MainPage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone } =
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
      <div>
        <button>전체취소</button>
        <button onClick={onClickOwner}>관리자 호출</button>
      </div>
      <div>
        <div>
          <div>수량 개</div>
          <div>총 금액 원</div>
        </div>
        <button onClick={onClickPay}>결제하기</button>
      </div>
    </>
  );
};
export default MainPage;
