import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {checkActiveCustomer} from "../api/api_call";

export default function Header() {
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

    const handleLogout = () => {
        // Xử lý đăng xuất: xóa thông tin người dùng khỏi localStorage và cập nhật state
        localStorage.removeItem("userInfo");

        // Xóa token khỏi state
        localStorage.removeItem("token");

        // Xóa thông tin người dùng khỏi state
        setUserInfo(null);

        // Chuyển hướng sang home
        navigate('/');
    };

    const checkUserActivation = async () => {
        if (userInfo) {
            console.log(userInfo.username);
            await checkActiveCustomer(userInfo.username);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Trang Chủ
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {!userInfo ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Đăng Nhập
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Đăng ký
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Đăng Xuất
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <Link to="/home-details-layout" style={{ textDecoration: "none", cursor: "pointer" }}
                                        onClick={() => {checkUserActivation();
                                            navigate("/home-details-layout");}}>
                                        <span className="nav-link">Xin chào {userInfo.username}</span>
                                    </Link>

                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" style={{color: "red"}}>Tiền {userInfo.money}</span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Link to="/nap-tien">
                    <button style={{color: "blue"}}>Nạp tiền</button>
                </Link>

                <Link to="/thue-keys">
                    <button style={{color: "red"}}>Thuê Key</button>
                </Link>
            </div>
        </nav>
    );
}
