import React, { useEffect, useState } from "react";
import "./Header.css";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="headerStyle">
            <div className="logoStyle">
                <Link to="/booker.vn">
                    <img className="logo" src="/images/logoBooker.svg" alt="Booker.vn" />
                </Link>
            </div>
            <div className="accountStyle">
                <FontAwesomeIcon
                    className="custom-icon"
                    icon={faBell}
                ></FontAwesomeIcon>
                <div className="accountStyle-details">
                    <img src="/images/fukuda.jpg"/>
                    <div style={{marginTop: '10px'}}>
                        <h3>Nguyễn Trường Sơn</h3>
                        <p>Nhà bán</p>
                    </div>

                    <div className="accountStyle-details_hover">
                        <Link to="/booker.vn/profile">
                            <li>Tài khoản</li>
                        </Link>
                        <Link to="/booker.vn/home">
                            <li>Tiếp tục mua hàng</li>
                        </Link>
                        <Link to="/booker.vn/close-store">
                            <li>Hủy cửa hàng</li>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
