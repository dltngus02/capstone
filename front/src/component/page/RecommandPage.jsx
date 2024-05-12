import React, { useEffect,useState } from "react";
import { useNavigation } from "../Router/Router";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./css/RecommandPage.css";
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const RecommandPage = () => {
    const location = useLocation();
    const [price,setPrice] = useState();
    const navigate = useNavigate()
    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [products3, setProducts3] = useState([]);
    const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } = useNavigation();
    
      useEffect(() => {
        fetch('/get_random_products')
          .then(response => response.json())
          .then(data => {
            // 서버에서 받은 데이터 처리
            console.log(data);
            const imagePath1 = data.products[0].image
 
            
            // 이미지 파일 주소를 웹 서버의 정적 파일 경로에 맞게 변경
            const imageUrl1 = imagePath1.replace(/^C:\/Users\/leesuhyeon\/Desktop\/back\/Project_MVC/, '');
            


            const imagePath2 = data.products[1].image
   
            
            // 이미지 파일 주소를 웹 서버의 정적 파일 경로에 맞게 변경
            const imageUrl2 = imagePath2.replace(/^C:\/Users\/leesuhyeon\/Desktop\/back\/Project_MVC/, '');
            
            const imagePath3 = data.products[2].image
   
            
            // 이미지 파일 주소를 웹 서버의 정적 파일 경로에 맞게 변경
            const imageUrl3 = imagePath3.replace(/^C:\/Users\/leesuhyeon\/Desktop\/back\/Project_MVC/, '');

            setProducts1([data.products[0].name, data.products[0].price, imageUrl1]);
          setProducts2([data.products[1].name, data.products[1].price, imageUrl2]);
          setProducts3([data.products[2].name, data.products[2].price, imageUrl3]);
      
            // 업데이트된 상태를 확인
            console.log(products1);
           // console.log(products2);
           // console.log(products3);
          })
          .catch(error => {
            // 에러 처리
            console.error('데이터를 가져오는 중 오류 발생:', error);
          });
      }, []);


      function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // 쿠키 이름으로 시작하는지 확인
            if (cookie.startsWith(name + '=')) {
                // 쿠키 값 반환
                return cookie.substring(name.length + 1);
            }
        }
        // 해당하는 쿠키가 없는 경우 null 반환
        return null;
    }
    function setCookie(name, value, days) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
      const expires = expirationDate.toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
  
    const onClickpay = () => {
    // url 쿠키 값을 가져오는 예시
    const urlCookie = getCookie('url');
    console.log(urlCookie)
    navigate('/pay?amount='+getCookie('sumprice'));
    }

    const onClickAdd1 = () => {
      const priceCookie = Number(getCookie('sumprice')) + Number(products1[1]);
      setCookie('sumprice',priceCookie,1)
 
    }
    const onClickAdd2 = () => {
      const priceCookie = Number(getCookie('sumprice')) + Number(products2[1]);
      setCookie('sumprice',priceCookie,1)
  }
  const onClickAdd3 = () => {
    const priceCookie = Number(getCookie('sumprice')) + Number(products3[1]);
    setCookie('sumprice',priceCookie,1)

}
    return (
      <div className="wrapper1">
          <header>
            <div className="Header">
              <div className="goods">1. 상품확인</div>
              <div className="pay">2. 결제 방법</div>
              <div className="done">3. 결제 완료</div>
            </div>
          </header>
        <div className="wrapper">
        <div className="main">
            <div className="no">No</div>
            <div className="pic">사진</div>
            <div className="name">상품명</div>
            <div className="number">수량</div>
            <div className="price">가격</div>
          </div>
           
          <div className="recommendBackground">
            <div>
                잠시만요! 이런 상품도 있어요
       
                <div>오늘의 <span style={{color: '#d24232'}}>추천</span> 상품
                </div>
            </div>
            <div className="wrapperrec">
                <div className="firstdiv">
                    {products1[0]}
                    <p>{products1[1]}원</p>
                    <img src={products1[2]}/>
                    {console.log(products1[2])}
                    <button onClick={onClickAdd1} className="payButton">추가</button>
                </div>
                <div className="seconddiv">
                {products2[0]}
                <p>{products2[1]}원</p>
                <img src={products2[2]}/>
                <button onClick={onClickAdd2} className="payButton" >추가</button>
                </div>
                <div className="thirddiv">
                    {products3[0]}
                    <p>{products3[1]}원</p>
                    <img src={products3[2]}/>
                    <button onClick={onClickAdd3} className="payButton" >추가</button>
                </div>
            </div>
                <button onClick={onClickpay} className="payButton">결제하기</button>
            <div>

            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RecommandPage;