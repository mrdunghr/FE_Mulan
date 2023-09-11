import React, {useEffect, useState} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {checkThePermissionToUseTheKey} from "../../api/api_call";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";

export default function MainDetailsListKey() {
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
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1>Danh sách keys</h1>
                {userInfo && (
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Key của bạn</th>
                            <th scope="col">Thời gian sử dụng</th>
                            <th scope="col">Lựa chọn</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userInfo.keyGens.map((keyGen, index) => (
                            <tr key={index}>
                                <td>{keyGen.codeKey}</td>
                                <td>{new Date(keyGen.endDate).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => checkPermissionAndSetToState(keyGen.id)} className="btn btn-primary">
                                        Kiểm tra quyền
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </main>
            <Footer/>
        </>
    );

}