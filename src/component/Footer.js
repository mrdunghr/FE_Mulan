import React from "react";
import './Foodter.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Liên hệ</h3>
                        <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
                        <p>Email: example@example.com</p>
                        <p>Điện thoại: (123) 456-7890</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Liên kết nhanh</h3>
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/about">Giới thiệu</a></li>
                            <li><a href="/contact">Liên hệ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Theo dõi chúng tôi</h3>
                        <ul>
                            <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
