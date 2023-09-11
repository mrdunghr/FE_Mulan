import Header from "../Header";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import './customCss.css'

const paymentMethods = [
    {
        name: "Momo",
        image: "./momo_0382564626.jpg",
        width: 400,
        height: 500,
    },
    {
        name: "Viettel Pay",
        image: "./ViettelPay_0382564626.jpg",
        width: 400,
        height: 500,
    },
    // các phương thức thanh toán khác sau này
];

export default function Naptien() {
    const [activeTab, setActiveTab] = useState(0); // State để theo dõi tab hiện tại
    const qrCodeContext = "";
    {/*<QRCode value="./momo_0382564626.jpg"/>*/}

    const [highlighted, setHighlighted] = useState(null); // State để theo dõi phần tử được highlight

    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <>
            <Header></Header>
            <h1>Trang Nạp tiền</h1>

            <div className="tab-container">
                {paymentMethods.map((method, index) => (
                    <div key={index} className={`tab ${activeTab === index ? "active" : ""}`}
                         onClick={() => handleTabChange(index)}
                         onMouseEnter={() => setHighlighted(index)} // Highlight khi di chuột vào
                         onMouseLeave={() => setHighlighted(null)} // Bỏ highlight khi di chuột ra
                         style={{ display: "inline-block", margin: "0 10px", cursor: "pointer" }}>
                        <h3 className={highlighted === index ? "highlight" : ""}>{method.name}</h3>
                    </div>
                ))}
            </div>

            <div className="tab-content">
                {paymentMethods.map((method, index) => (
                    <div key={index}>
                        {activeTab === index && (
                            <img src={method.image} alt={`Mô tả hình ảnh ${method.name}`} width={method.width} height={method.height}/>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <h3>Chuyển khoản với nội dung</h3>
                <b><i>Tên tk + Mua Auto Tren Website Mulan + sdt</i></b>
            </div>
            <h5>Ví dụ: (Admin Mua Auto Tren Website Mulan 0382564626)</h5>
            <h5 style={{color: "red"}}>Nội dung sai mà chưa liên hệ admin có thể mất tiền</h5>
        </>
    );
}
