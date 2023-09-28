import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useNavigation } from "../../Router/Router";
import ItemCount from "./ItemCount";
const initalState = {
  mockData: [
    {
      id: 1,
      name: "농심 새우깡 500g",
      amount: 1,
      price: 1500,
    },
    {
      id: 2,
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
    <>
      <div>
        {state.mockData.map((item) => (
          <div key={item.id}>
            <p>상품명: {item.name}</p>
            <div>
              <button
                onClick={() => dispatch({ type: "INCREASE", data: item.id })}
              >
                +
              </button>
              <p>수량: {item.amount}</p>
              <button
                onClick={() => dispatch({ type: "DECREASE", data: item.id })}
              >
                -
              </button>
            </div>
            <p>가격: {item.price}원</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => dispatch({ type: "CLEAR" })}>전체취소</button>
        <button onClick={onClickOwner}>관리자 호출</button>
      </div>

      <ItemCount mockData={state.mockData} />
    </>
  );
};
export default Item;
