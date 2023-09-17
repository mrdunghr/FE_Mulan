import React, {useEffect, useState} from "react";
import Header from "../Header";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {checkActiveCustomer, genKey, getIdCustomerfromCustomerName} from "../../api/api_call";

export default function ThueKeys() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //kiểm tra xem đã đăng nhập chưa
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
        }
    }, []);

    const handleInfoKeyDate = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Key thuê theo từng ngày',
            showConfirmButton: false,
            timer: 0,
            allowOutsideClick: true, //đóng thông báo khi click ra ngoài
        })
    };
    const handleInfoKeyMonth = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Key theo tháng, ngày này thời điểm này tháng sau sẽ hết hạn',
            showConfirmButton: false,
            timer: 0,
            allowOutsideClick: true, //đóng thông báo khi click ra ngoài
        })
    };
    const handleInfoKeyVip = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Key Vip này không giới hạn sử dụng, không giới hạn máy, liên hệ ADMIN',
            showConfirmButton: false,
            timer: 0,
            allowOutsideClick: true, //đóng thông báo khi click ra ngoài
        })
    };

    const handleRentKey = () => {
        if (!userInfo) {
            // Kiểm tra nếu chưa đăng nhập
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Bạn chưa đăng nhập",
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: true, // Cho phép đóng thông báo khi click ra ngoài
            });
            navigate('/login');
        } else {
            // Đã đăng nhập, cho phép thuê key
            const newKey = genKey(userInfo.idCustomer)
            const updatedUserInfo = { ...userInfo }; // tạo một bản sao của userInfo
            updatedUserInfo.keyGens.push(newKey); // thêm key mới vào danh sách keyGens

            // Cập nhật đối tượng userInfo
            setUserInfo(updatedUserInfo);

            // Lưu đối tượng userInfo đã cập nhật vào Local Storage
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Key đã được thuê",
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: true, // Đóng thông báo khi click ra ngoài
            });
        }
    };

    return (
        <>
            <Header />
            <h1>Trang thuê key</h1>
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <h2 onClick={handleInfoKeyDate}>Key theo ngày</h2>
                    </div>
                    <button onClick={handleRentKey}>thuê</button>
                </div>
                <div className="col-md-4">
                    <div>
                        <h2 onClick={handleInfoKeyMonth}>Key theo tháng</h2>
                    </div>
                    <button onClick={handleRentKey}>thuê</button>
                </div>
                <div className="col-md-4">
                    <div>
                        <h2 onClick={handleInfoKeyVip}>Key VIP</h2>
                    </div>
                    <button onClick={handleRentKey}>thuê</button>
                </div>
            </div>
        </>
    );
}
