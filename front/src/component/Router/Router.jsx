// RouterFunctions.js
import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const onClickStart = () => {
    navigate("/main");
  };

  const onClickOwner = () => {
    navigate("/owner");
  };

  const onClickPay = () => {
    navigate("/pay");
  };

  const onClickDone = () => {
    navigate("/done");
  };
  const onClickMain = () => {
    navigate("/");
  };
  const onClickRec = () => {
    navigate("/recommand")
  }
 
  return {
    onClickStart,
    onClickOwner,
    onClickPay,
    onClickDone,
    onClickMain,
    onClickRec,
  };
};
