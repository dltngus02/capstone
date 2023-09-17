import React, { useEffect, useReducer, useCallback, useState } from "react";
const PayPage = () => {
  return (
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
          <button>현금</button>
        </div>
        <div>
          <button>카드</button>
        </div>
      </div>
    </>
  );
};
export default PayPage;
