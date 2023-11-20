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
  idx: 3,
  mockData: [
    {
      id: 1,
      img: image1,
      name: "농심 새우깡 500g",
      amount: 1,
      price: 1500,
    },

  ],
  products: []
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
      );
      return {
        ...state,
        products: newDecreaseData,
      };
    case "CLEAR":
      return {
        ...state,
        products: [],
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
        let breakpoint = false;
        if (item_list.length === 0) {
          item_list.push([product.amount, product.name, product.price, product.image]);
        } else {
          for (let j = 0; j < item_list.length; j++) {
            if (item_list[j][1] === product.name) {
              item_list[j][0]++;
              breakpoint = true;
              break;
            }
          }
          if (!breakpoint) {
            item_list.push([product.amount, product.name, product.price, product.image]);
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
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="itemBack">
      <div className="itemMap">
        {state.products.map((item, index) => (
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
                ></button>
              </div>
            </div>
            <div className="itemPrice">
              <p>{item.price}원</p>
            </div>
          </div>
        ))}
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
      <ItemCount mockData={state.products} allData={state.products} />
    </div>
  );
};

export default Item;