import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../Router/Router";
const DonePage = () => {
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
      <div>결제가 완료되었습니다! 안녕히가세요</div>
      <button onClick={onClickMain}>처음으로</button>
    </>
  );
};
export default DonePage;
