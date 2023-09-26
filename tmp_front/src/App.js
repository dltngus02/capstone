import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Flask 서버에서 JSON 데이터를 가져옵니다.
    axios.get('/').then((response) => { 
      setProducts(response.data.item);
    });
  }, []);
 //html 리턴하는 부분, {} 으로 쓰여져 있는 부분이 변수 가져다 쓰는거임 
  return ( 
    <div>
      <h1>제품 목록</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}</p>
            <img src={product.image} alt={product.name} />
            <p>수량: {product.num}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;