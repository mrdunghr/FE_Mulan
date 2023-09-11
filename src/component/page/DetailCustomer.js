import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {checkThePermissionToUseTheKey} from "../../api/api_call";
import Swal from "sweetalert2";
import Header from "../Header";

export default function DetailCustomer() {
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
                    title: 'Oops...',
                    text: 'Bạn không có quyền sử dụng key này tại đây!',
                })
            });
    };
    return (
        <>
        <Header></Header>
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
                                <p><strong>Permission Key: {permissionKeys[keyGen.id]}</strong></p>
                                <button onClick={() => checkPermissionAndSetToState(keyGen.id)}>Kiểm tra quyền</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
        </>
    );
}