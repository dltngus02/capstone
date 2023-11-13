import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import ItemCount from "./ItemCount";
import image1 from "./1.jpg";
import image2 from "./2.jpg";
<<<<<<< HEAD

import minus from "./minus.png";
=======
import Axios from 'axios';
import minus from "./minus.png";
import io from 'socket.io-client';
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
  products : [

  ]
>>>>>>> origin/master
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
<<<<<<< HEAD
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
=======
      console.log(state.products)
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
>>>>>>> origin/master
          ? { ...item, amount: item.amount - 1 }
          : item
      );
      return {
        ...state,
<<<<<<< HEAD
        mockData: newDecreaseData,
=======
        products: newDecreaseData,
>>>>>>> origin/master
      };
    case "CLEAR":
      return {
        ...state,
<<<<<<< HEAD
        mockData: [],
      };
=======
        products: [],
      };
    case "SET_PRODUCTS":
        return {
          ...state,
          products: action.data,
        };
    case "IMAGE":
      console.log(state.products)
      const newImage = state.products.map((item) =>
        console.log(item.image)
      );
      
>>>>>>> origin/master
    default:
      return state;
  }
};
const Item = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  const [state, dispatch] = useReducer(reducer, initalState);

<<<<<<< HEAD
  return (
    <div className="itemBack">
      <div className="itemMap">
        {state.mockData.map((item) => (
          <div className="itemflex" key={item.id}>
            <p className="itemId">{item.id}</p>
            <div className="container">
              <img src={item.img} />
=======
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
        console.log("실행중");
        socket.on('update_product', (product) => {
          // 수신된 데이터를 사용하여 원하는 작업 수행
          console.log('Received product data:', product);
          let breakpoint = false;
          if (item_list.length === 0){
            item_list.push([product.amount, product.name, product.price, product.image])
          }
          else{
            for (let j = 0; j < item_list.length; j++) {
              if (item_list[j][1] === product.name) {
                item_list[j][0]++;
                breakpoint = true;
                break;
              }
            }
            if (!breakpoint) {
              item_list.push([product.amount, product.name, product.price, product.image])
            }
          }
        const updatedProducts = item_list.map(([amount, name, price, image]) => ({
          amount,
          name,
          price,
          image,
        }));
        dispatch({ type: "SET_PRODUCTS", data: updatedProducts });

      });
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    // 클린업 함수
    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);


  return (
    <div className="itemBack">
      <div className="itemMap">
        {state.products.map((item,index) => (
          <div className="itemflex" key={index}>
            <div className="itemId">
              <p>{index}</p>
            </div>
            <div className="container">
              <img src={item.image} />
>>>>>>> origin/master
            </div>
            <div className="itemNameContainer">
              <p className="itemName">{item.name}</p>
            </div>
            <div className="itemcounter">
<<<<<<< HEAD
              <button
                className="button_plus"
                onClick={() => dispatch({ type: "INCREASE", data: item.id })}
              ></button>
              <p className="itemAmount">{item.amount}</p>
              <button
                className="button_minus"
                onClick={() => dispatch({ type: "DECREASE", data: item.id })}
              ></button>
            </div>
            <p className="itemPrice"> {item.price}원</p>
=======
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
                ></button>
              </div>
            </div>
            <div className="itemPrice"> <p>{item.price}원</p></div>
>>>>>>> origin/master
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
<<<<<<< HEAD
        <button className="buttonCall" onClick={onClickOwner}>
=======
        <button className="buttonCall" onClick={callAdmin}>
>>>>>>> origin/master
          관리자 호출
        </button>
      </div>

<<<<<<< HEAD
      <ItemCount mockData={state.mockData} />
=======
      <ItemCount mockData={state.products} allData={state.products}/>
      {console.log(state.products)}
>>>>>>> origin/master
    </div>
  );
};

export default Item;
