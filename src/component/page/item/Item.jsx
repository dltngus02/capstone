import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import ItemCount from "./ItemCount";
import image1 from "./1.jpg";
import image2 from "./2.jpg";
import Axios from 'axios';
import minus from "./minus.png";
import "./css/Item.css";
const initalState = {
  idx: 3,
  mockData: [
    {
      id: 1,
      img: image1,
      name: "농심 새우깡 500g",
      amount: 1,
      price: 1500,
    },
    {
      id: 2,
      img: image2,
      name: "카레여왕 500g",
      amount: 2,
      price: 3000,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      const newIncreaseData = state.mockData.map((item) =>
        item.id === action.data ? { ...item, amount: item.amount + 1 } : item
      );
      return {
        ...state,
        mockData: newIncreaseData,
      };
    case "DECREASE":
      const newDecreaseData = state.mockData.map((item) =>
        item.id === action.data && item.amount > 0
          ? { ...item, amount: item.amount - 1 }
          : item
      );
      return {
        ...state,
        mockData: newDecreaseData,
      };
    case "CLEAR":
      return {
        ...state,
        mockData: [],
      };
    default:
      return state;
  }
};
const Item = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  const [state, dispatch] = useReducer(reducer, initalState);
  const [products, setProducts] = useState([])
  Axios.defaults.baseURL = 'http://127.0.0.1:5000/'; // Flask 서버 주소로 변경하세요

  useEffect(() => {
    // Flask 서버로부터 JSON 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await Axios.get('/get_products'); // Flask 서버의 엔드포인트
        setProducts(response.data.item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    fetchData();
  }, []);
  return (
    <div className="itemBack">
      <div className="itemMap">
        {products.map((item) => (
          <div className="itemflex" key={item.id}>
            <div className="itemId">
              <p>{item.id}</p>
            </div>
            <div className="container">
              <img src={item.img} />
            </div>
            <div className="itemNameContainer">
              <p className="itemName">{item.name}</p>
            </div>
            <div className="itemcounter">
            <div className="divplus">
                <button
                  className="button_plus"
                  onClick={() => dispatch({ type: "INCREASE", data: item.id })}
                ></button>
              </div>
              <p className="itemAmount">{item.amount}</p>
              <div className="divminus">
                <button
                  className="button_minus"
                  onClick={() => dispatch({ type: "DECREASE", data: item.id })}
                ></button>
              </div>
            </div>
            <div className="itemPrice"> <p>{item.price}원</p></div>
          </div>
        ))}
      </div>

      <div className="buttonContainer">
        <button
          className="buttonClear"
          onClick={() => dispatch({ type: "CLEAR" })}
        >
          전체취소
        </button>
        <button className="buttonCall" onClick={onClickOwner}>
          관리자 호출
        </button>
      </div>

      <ItemCount mockData={products} />
    </div>
  );
};

export default Item;
