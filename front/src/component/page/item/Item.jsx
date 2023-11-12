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
  products : [

  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
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
    case "IMAGE":
      console.log(state.products)
      const newImage = state.products.map((item) =>
        console.log(item.image)
      );
      
    default:
      return state;
  }
};
const Item = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  const [state, dispatch] = useReducer(reducer, initalState);

  Axios.defaults.baseURL = 'http://127.0.0.1:5000/';
  const item_list = [];
  useEffect(() => {
    // fetchData 함수 정의
    const fetchData = async () => {
      try {
        console.log("실행중");
        const response = await Axios.get('get_products');


        for (let i = 0; i < response.data.item.length; i++) {
          if (item_list.length === 0) {
            item_list.push([response.data.item[i].amount, response.data.item[i].name, response.data.item[i].price, response.data.item[i].image]);
            continue;
          }

          let breakpoint = false;

          for (let j = 0; j < item_list.length; j++) {
            if (item_list[j][1] === response.data.item[i].name) {
              item_list[j][0]++;
              breakpoint = true;
              break;
            }
          }

          if (!breakpoint) {
            item_list.push([response.data.item[i].amount, response.data.item[i].name, response.data.item[i].price, response.data.item[i].image]);
          }
        }

        // 업데이트된 상품으로 상태 업데이트
        const updatedProducts = item_list.map(([amount, name, price, image]) => ({
          amount,
          name,
          price,
          image,
        }));
        dispatch({ type: "SET_PRODUCTS", data: updatedProducts });

      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    // fetchData 함수 초기 호출
    fetchData();

    // 5초마다 fetchData 주기적 호출 설정
    const intervalId = setInterval(fetchData, 2000);

    // 컴포넌트가 언마운트될 때 인터벌 해제
    return () => clearInterval(intervalId);
  }, [dispatch]);



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

      <ItemCount mockData={state.products} allData={state.products}/>
      {console.log(state.products)}
    </div>
  );
};

export default Item;
