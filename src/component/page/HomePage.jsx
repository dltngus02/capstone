import React, { useEffect, useReducer, useCallback, useState } from "react";

import { useNavigation } from "../Router/Router";
const HomePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone } =
    useNavigation();
  return (
    <>
      <button onClick={onClickOwner}>직원 호출버튼</button>
      <div>무인 계산대</div>
      <button onClick={onClickStart}>시작하기</button>
    </>
  );
};
export default HomePage;
