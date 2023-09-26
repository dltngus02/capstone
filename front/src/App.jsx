import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./component/page/HomePage";
import MainPage from "./component/page/MainPage";
import PayPage from "./component/page/PayPage";
import DonePage from "./component/page/DonePage";
import OwnerPage from "./component/page/OwnerPage";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/main/*" element={<MainPage />}></Route>
          <Route path="/pay/*" element={<PayPage></PayPage>}></Route>
          <Route path="/done/*" element={<DonePage></DonePage>}></Route>
          <Route path="/owner/*" element={<OwnerPage></OwnerPage>}></Route>
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
