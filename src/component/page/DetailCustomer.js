import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {checkThePermissionToUseTheKey} from "../../api/api_call";

export default function DetailCustomer() {
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

    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('userInfo');

        // Xóa thông tin người dùng khỏi state
        setUserInfo(null);

        // Chuyển hướng sang trang chi tiết người dùng
        navigate('/login');
    };
    return (
        <div className="user-detail">
            <h2>User Details</h2>
            {userInfo && (
                <>
                    <p><strong>Authentication Type: {userInfo.authenticationType}</strong></p>
                    <p><strong>Created Time: {userInfo.createdTime}</strong></p>
                    <p><strong>Email: {userInfo.email}</strong></p>
                    <p><strong>Enabled: {userInfo.enabled ? 'Yes' : 'No'}</strong></p>
                    <p><strong>Phone: {userInfo.phone}</strong></p>
                    <p><strong>Username: {userInfo.username}</strong></p>
                    <p><strong>Money: {userInfo.money}</strong></p>

                    <h3>Key Generators:</h3>
                    <ul>
                        {userInfo.keyGens.map((keyGen, index) => (
                            <li key={index}>
                                <p><strong>Code Key: {keyGen.codeKey}</strong></p>
                                <p><strong>Expiration Date: {new Date(keyGen.endDate).toLocaleString()}</strong></p>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <div className="form-group text-center">
                <button type="button" className="btn btn-primary" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}