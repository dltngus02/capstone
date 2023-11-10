IMP.init("imp41444282");

const button = document.querySelector("button");
var quantity = Math.random() * 1000;

const onClickPay = async () => {
    var HOTNODDLE = "NODDLE"+quantity;
    IMP.request_pay({
        pg: "kakaopay",
        pay_method: "card",
        amount: "100",
        name: "매운 라면",
        merchant_uid: HOTNODDLE,
    }, async (rsp) => {
        if (rsp.success) {
            quantity += 1;
            window.location.href = '/결제완료';
        } else {
            // 결제가 실패한 경우에 대한 처리를 여기에 추가할 수 있습니다.
            alert("결제에 실패하였습니다: " + rsp.error_msg);
        }
    });
};

button.addEventListener("click", onClickPay);