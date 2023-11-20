import React, { useEffect, useReducer, useCallback, useState } from "react";
import "./css/DonePage.css"
import { useNavigation } from "../Router/Router";
const DonePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  const [ count, setCount ] = useState(10);
  const [alert,setAlert] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  
    setTimeout(() => {
      clearInterval(interval); // setInterval 정지
      onClickMain();
    }, 10000);
  
    return () => clearInterval(interval); // 컴포넌트 unmount 시 clearInterval 실행
  }, []);

  
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
        결제가 완료되었습니다! 안녕히가세요 <br/><span style={{fontSize:'45px',color: '#d24232'}}>{count}초 후 메인 페이지로 이동합니다</span>
        </div>
        
      </div>
    </>
  );
};
export default DonePage;
