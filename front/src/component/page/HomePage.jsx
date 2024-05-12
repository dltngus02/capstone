import React, { useEffect, useReducer, useCallback, useState } from "react";

import "./css/HomePage.css";
import { useNavigation } from "../Router/Router";

const HomePage = () => {
  const { onClickStart, onClickOwner, onClickPay, onClickDone, onClickMain } =
    useNavigation();
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const handleButtonClick = () => {
    window.location.href = 'http://127.0.0.1:5000/admin/login';
  };
  useEffect(() => {
    const ttsState = sessionStorage.getItem("ttsEnabled");
    if (ttsState) {
      setTtsEnabled(JSON.parse(ttsState));
    }
  }, []);
  const handleButtonClickStart = () => {
    onClickStart()
  }; 
  const ttsClick = () => {
    setTtsEnabled(prevState => !prevState);
    sessionStorage.setItem("ttsEnabled", JSON.stringify(!ttsEnabled));
  };
  const handleMouseEnter = (event) => {
    if (ttsEnabled) {
      const tts_script = event.target.innerText;
      const utterance = new SpeechSynthesisUtterance(tts_script); // SpeechSynthesisUtterance 객체 생성
      window.speechSynthesis.speak(utterance); // TTS 실행
    }
  };
  
  return (
    <>
      <button className="ownerCall" onClick={handleButtonClick}>
        직원 로그인
      </button>
      <div className="selfCounter">무인 계산대</div>

      <button className="start" onClick={handleButtonClickStart} onMouseEnter={handleMouseEnter}>
        시작하기
      </button>
      <button className="ttsButton" onClick={ttsClick}  onMouseEnter={handleMouseEnter}>{ttsEnabled ? "TTS 끄기" : "TTS 사용"}</button>
      <div className="back"></div>
      <div className="img"></div>
    </>
  );
};
export default HomePage;
