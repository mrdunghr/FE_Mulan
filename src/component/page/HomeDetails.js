import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {checkThePermissionToUseTheKey} from "../../api/api_call";
import Swal from "sweetalert2";
import Header from "../Header";

export default function HomeDetails() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const [permissionKeys, setPermissionKeys] = useState({}); // Thêm state để lưu Permission Key

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

    // Hàm này sẽ gọi checkThePermissionToUseTheKey và cập nhật state permissionKeys
    const checkPermissionAndSetToState = (idKey) => {
        checkThePermissionToUseTheKey(idKey)
            .then(permissionKey => {
                setPermissionKeys(permissionKey); // Cập nhật giá trị prevPermissionKeys bằng giá trị boolean
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bạn có thể sử dụng key này tại đây',
                    showConfirmButton: false,
                    timer: 5000
                })
            })
            .catch(error => {
                console.error('Lỗi khi kiểm tra quyền sử dụng key:', error.response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Toang rồi...',
                    text: 'Bạn không có quyền sử dụng key này tại đây!',
                })
            });
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <nav
                        id="sidebar"
                        className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
                    >
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/details-customer">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/">Home</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>


                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h1>ok</h1>
                    </main>
                </div>
            </div>
        </>
    );
}