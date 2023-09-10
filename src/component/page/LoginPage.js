import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from "../../api/api_call";
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // Kiểm tra nếu có thông tin người dùng trong localStorage
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);

            // Nếu đã đăng nhập, chuyển hướng đến trang chi tiết người dùng
            navigate('/customer');
        }
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        login(username, password)
            .then((response) => {
                console.log('Đăng nhập thành công:', response.data);
                const token = response.data
                const tokenWithoutBearer = token.split('mrdunghr: ')[1];
                localStorage.setItem('token', JSON.stringify(tokenWithoutBearer));

                const decodedToken = jwtDecode(tokenWithoutBearer);
                if (decodedToken) {
                    console.log('Thông tin từ token:', decodedToken);

                    // Lưu thông tin người dùng vào localStorage
                    localStorage.setItem('userInfo', JSON.stringify(decodedToken));

                    // Lưu thông tin người dùng vào state
                    setUserInfo(decodedToken);

                    // Chuyển hướng sang trang chi tiết người dùng
                    navigate('/customer');
                }

            })
            .catch((error) => {
                // Xử lý lỗi đăng nhập
                console.error('Đăng nhập thất bại:', error);
                setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra tên người dùng và mật khẩu.');
            });
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h2 className="text-center">Đăng nhập</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Tên người dùng:</label>
                                <input type="text" className="form-control" id="username" placeholder="Nhập tên người dùng" value={username}
                                    onChange={handleUsernameChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mật khẩu:</label>
                                <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" value={password}
                                    onChange={handlePasswordChange}/>
                            </div>
                            <div className="form-group text-center">
                                <button type="button" className="btn btn-primary"
                                    onClick={handleLogin}>
                                    Đăng nhập
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
    );

}
