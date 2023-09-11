import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Header() {
    const [userInfo, setUserInfo] = useState(null);

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
        localStorage.removeItem("token");
        setUserInfo(null);
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
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Đăng Nhập
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Đăng Xuất
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Xin chào {userInfo.username}</span>
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
