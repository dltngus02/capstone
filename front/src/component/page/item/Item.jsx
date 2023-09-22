import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import ItemCount from "./ItemCount";
import image1 from "./1.jpg";
import image2 from "./2.jpg";

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

  return (
    <div className="itemBack">
      <div className="itemMap">
        {state.mockData.map((item) => (
          <div className="itemflex" key={item.id}>
            <p className="itemId">{item.id}</p>
            <div className="container">
              <img src={item.img} />
            </div>
            <div className="itemNameContainer">
              <p className="itemName">{item.name}</p>
            </div>
            <div className="itemcounter">
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

      <ItemCount mockData={state.mockData} />
    </div>
  );
};

export default Item;
