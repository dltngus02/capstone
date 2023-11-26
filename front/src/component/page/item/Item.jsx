import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import ItemCount from "./ItemCount";
import image1 from "./1.jpg";
import image2 from "./2.jpg";
import Axios from 'axios';
import minus from "./minus.png";
import io from 'socket.io-client';
import "./css/Item.css";

const initialState = {
  idx: 0,
  mockData: [
    {
      id: 1,
      img: image1,
      name: "농심 새우깡 500g",
      amount: 1,
      price: 1500,
    },

  ],
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      const newIncreaseData = state.products.map((item) =>
        item.name === action.data ? { ...item, amount: item.amount + 1 } : item
      );
      return {
        ...state,
        products: newIncreaseData,
      };
    case "DECREASE":
      const newDecreaseData = state.products.map((item) =>
        item.name === action.data && item.amount > 0
          ? { ...item, amount: item.amount - 1 }
          : item
      )
      const newZeroData = newDecreaseData.filter((item) => item.amount !== 0);
      return {
        ...state,
        products: newZeroData,
      };
     
    case "CLEAR":
      return {
        ...state,
        idx : state.products.length,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.data,
      };
    default:
      return state;
  }
};

const Item = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [deleteIndex, setDeleteIndex] = useState([]);
  const item_list = [];
  const callAdmin = () => {
    fetch('/admin/call', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.log(error);
      });
  };

 useEffect(() => {
  const socket = io.connect('http://127.0.0.1:5000');
  try {
    socket.on('update_product', (product) => {
      console.log('Received product data:', product);

      const updatedProducts = [...state.products]; // 이전 상태를 복제하여 업데이트할 예정

      // 상태 업데이트 로직
      const existingProductIndex = updatedProducts.findIndex(item => (item.name === product.name && state.idx<=item.id));
      if (existingProductIndex !== -1) {
        // 이미 존재하는 제품인 경우 수량을 업데이트
        updatedProducts[existingProductIndex].amount += product.amount;
      } else {
        // 새로운 제품인 경우 상태에 추가
        updatedProducts.push({
          amount: product.amount,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }

      // amount가 0인 상품 필터링하여 삭제
      const filteredProducts = updatedProducts.filter(item => item.amount !== 0);

      // 상태 업데이트
      dispatch({ type: "SET_PRODUCTS", data: filteredProducts });
    });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  }
  return () => {
    socket.disconnect();
  };
}, [state.products]);

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="itemBack">
      <div className="itemMap">
        {state.products.slice(state.idx).map((item, index) => (
             item.amount > 0 && (
          <div className="itemflex" key={index}>
            <div className="itemId">
              <p>{index}</p>
            </div>
            <div className="container">
              <img src={item.image} alt="상품 이미지" />
            </div>
            <div className="itemNameContainer">
              <p className="itemName">{item.name}</p>
            </div>
            <div className="itemcounter">
              <div className="divplus">
                <button
                  className="button_plus"
                  onClick={() => dispatch({ type: "INCREASE", data: item.name })}
                ></button>
              </div>
              <p className="itemAmount">{item.amount}</p>
              <div className="divminus">
                <button
                  className="button_minus"
                  onClick={() => dispatch({ type: "DECREASE", data: item.name })}
                  
                >{console.log(state.products)}</button>
              </div>
            </div>
            <div className="itemPrice">
              <p>{item.price}원</p>
            </div>
          </div>
        )))}
      </div>
      <div className="buttonContainer">
        <button className="buttonClear" onClick={handleClear}>
          전체취소
        </button>
        <button className="buttonCall" onClick={onClickMain}>
        처음으로
        </button>
        <button className="buttonReturnStart" onClick={callAdmin}>
          관리자 호출
        </button>
      </div>
      <ItemCount mockData={state.products.slice(state.idx)} allData={state.products.slice(state.idx)} />
    </div>
  );
};

export default Item;