import React, { useEffect,useState } from "react";
import { useNavigation } from "../Router/Router";
import "./css/PayPage.css";
import Axios from "axios";
import { useLocation } from 'react-router-dom';
const PayPage = () => {
  const location = useLocation();
  const [price,setPrice] = useState();
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
      useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const amount = queryParams.get('amount');
        setPrice(amount)
        const jquery = document.createElement("script");
        jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
          document.head.removeChild(jquery);
          document.head.removeChild(iamport);
        };
      }, []);
      
      var quantity = Math.random() * 1000;
      
      const Payment = () => {
        
        const {IMP} = window;
        IMP.init("imp41444282");
        var HOTNODDLE = "NODDLE"+quantity;
        const data = {
            pg: "kakaopay",
            pay_method: "card",
            amount: `${price}`,
            name: "무인가게 결제",
            merchant_uid: HOTNODDLE,
        };
        IMP.request_pay(data,callback);
      }
      const callback = (response) =>{
        const {sucess,error_msg,imp_uid,merchant_uid,pay_method,paid_amount,status} = response
        if(sucess){
          alert("결제성공");
          onClickDone()
        }
        else if(error_msg==undefined){
          alert("결제성공");
          onClickDone()       
        }
        else{
          alert(`결제실패 : ${error_msg}`);
        }
      }

  return (
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
          <button className="cash"  onClick={Payment}>
        
            
          </button>
          <button className="card" onClick={onClickDone}>
  
            현금
          </button>

        </div>     
        <div className="returnStart">   
          <button className="buttonCall1" onClick={onClickMain}>
            처음으로
          </button>
        </div>

      </div>
    </div>
  );
};

export default PayPage;