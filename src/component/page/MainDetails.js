import React, {useEffect, useState} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {useNavigate} from "react-router-dom";
import {checkThePermissionToUseTheKey} from "../../api/api_call";
import Swal from "sweetalert2";
import Footer from "../Footer";

export default function MainDetails(){
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (!storedUserInfo) {
            // Nếu không có thông tin người dùng, chuyển hướng về trang đăng nhập
            navigate('/login');
        } else {
            const parsedUserInfo = JSON.parse(storedUserInfo);

            // // Chuyển đổi Created Time từ timestamp sang ngày tháng năm chuẩn
            // parsedUserInfo.createdTime = new Date(parsedUserInfo.createdTime).toLocaleDateString();

            // Chuyển đổi Created Time từ timestamp sang ngày tháng năm và giờ phút giây chuẩn
            const createdTime = new Date(parsedUserInfo.createdTime).toLocaleString();
            parsedUserInfo.createdTime = createdTime;

            setUserInfo(parsedUserInfo);
        }
    }, [navigate]);

    useEffect(() => {
        // Sử dụng userInfo ở đây để thực hiện các thao tác sau khi đã có dữ liệu
        if (userInfo) {
            console.log("customer", userInfo);
        }
    }, [userInfo]);

    return (
        <>
            <Header />
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1>Thông tin của bạn</h1>
                <div className="user-detail">
                    {userInfo && (
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Kiểu tài khoản:</th>
                                <td>{userInfo.authenticationType}</td>
                            </tr>
                            <tr>
                                <th>Thời gian tạo:</th>
                                <td>{userInfo.createdTime}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{userInfo.email}</td>
                            </tr>
                            <tr>
                                <th>Được kích hoạt:</th>
                                <td>{userInfo.enabled ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th>Số điện thoại:</th>
                                <td>{userInfo.phone}</td>
                            </tr>
                            <tr>
                                <th>Tài Khoản:</th>
                                <td>{userInfo.username}</td>
                            </tr>
                            <tr>
                                <th>Số dư tài khoản:</th>
                                <td>{userInfo.money}</td>
                            </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            <Footer/>
        </>
    );
}