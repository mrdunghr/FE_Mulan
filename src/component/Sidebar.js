import {Link} from "react-router-dom";
import React from "react";

export default function Sidebar() {
    return (
        <div className="container-fluid">
            <div className="row">
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
                                <Link to="/main-details">Thôn tin khách</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/main-details-list-keys">Danh sách keys</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}