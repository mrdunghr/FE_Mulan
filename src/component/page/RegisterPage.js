import React, { useState } from "react";
import Header from "../Header";
import {register} from "../../api/api_call";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        setFormData({ ...formData, username: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleEmailChange = (e) => {
        setFormData({ ...formData, email: e.target.value });
    };

    const handlePhoneChange = (e) => {
        setFormData({ ...formData, phone: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Lấy thông tin từ formData
        const { username, password, email, phone } = formData;

        // Gọi hàm đăng ký và xử lý kết quả
        register(username, password, email, phone)
            .then((response) => {
                // Xử lý khi đăng ký thành công
                console.log('Đăng ký thành công:', response);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Đăng ký thành công',
                    showConfirmButton: false,
                    timer: 5000
                })

                // Chuyển hướng hoặc thực hiện các tác vụ khác sau khi đăng ký thành công
                navigate('/login');
            })
            .catch((error) => {
                // Xử lý lỗi khi đăng ký thất bại
                console.error('Đăng ký thất bại:', error);

                // Hiển thị thông báo lỗi cho người dùng hoặc thực hiện các tác vụ khác
                setErrorMessage(error.response.data.message)
            });
    };

    return (
        <>
            <Header></Header>
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <h2 className="text-center">Đăng ký</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Tên Tài Khoản:</label>
                                    <input type="text" className="form-control" id="username" placeholder="Tài khoản" value={formData.username}
                                           onChange={handleUsernameChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu:</label>
                                    <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" value={formData.password}
                                           onChange={handlePasswordChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Nhập Email:</label>
                                    <input type="email" className="form-control" id="email" placeholder="Email" value={formData.email}
                                           onChange={handleEmailChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Nhập số điện thoại:</label>
                                    <input type="tel" className="form-control" id="phone" placeholder="Số điện thoại" value={formData.phone}
                                           onChange={handlePhoneChange}/>
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary"
                                            onClick={handleRegister}>
                                        Đăng ký
                                    </button>
                                </div>
                                {errorMessage && (
                                    <div className="alert alert-danger text-center">
                                        {errorMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
