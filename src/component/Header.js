import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

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
                                    <Link to="/home-details-layout" style={{textDecoration: "none"}}>
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
                    <span className="nav-link" style={{color: "blue"}}>Nạp tiền</span>
                </Link>
            </div>
        </nav>
    );
}
