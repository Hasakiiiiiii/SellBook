import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './Sidebar.css'

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faOutdent } from '@fortawesome/free-solid-svg-icons';




const Sidebar = () => {

    const [openMenu, setOpenMenu] = useState("home"); // Trạng thái lưu mục cha đang được mở
    const [openMenuChild, setOpenMenuChild] = useState(null); 

    // Hàm để mở hoặc đóng menu
    const handleMenuClick = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu); // Đóng mục đang mở hoặc mở mục mới
    };

    return (
        <nav className='sidebarStyle'>
            <ul className='listStyle scroll-container'>
                <li>
                    <Link className={openMenu === "home" ? 'itemStyle-click itemStyle' : 'itemStyle'}   onClick={() => handleMenuClick("home")} to="/">
                        <FontAwesomeIcon className='mr-5' icon={faStore}></FontAwesomeIcon>
                        NameOfStore.vn</Link>
                </li>
                <li>
                    <Link className={openMenu === "info" ? 'itemStyle-click itemStyle' : 'itemStyle'}   onClick={() => handleMenuClick("info")} to="/information-store">
                        <FontAwesomeIcon className='mr-5' icon={faShopify}></FontAwesomeIcon>
                        Thông tin cửa hàng</Link>
                </li>
                <li>
                    <Link className={openMenu === "manage_product_store" ? 'itemStyle-click itemStyle' : 'itemStyle'}   onClick={() => handleMenuClick("manage_product_store")} to="/manage-product-store">
                        <FontAwesomeIcon className='mr-5' icon={faBook}></FontAwesomeIcon>
                        Quản lý sản phẩm</Link>
                </li>
                <li>
                    <Link  className={openMenu === "orders" ? 'itemStyle-click itemStyle' : 'itemStyle'}   onClick={() => handleMenuClick("orders")}>
                        <FontAwesomeIcon className='mr-5' icon={faFileInvoice}></FontAwesomeIcon>
                        Quản lý đơn hàng
                        <FontAwesomeIcon className='faAngleDown' icon={openMenu === "orders" ? faAngleUp : faAngleDown}></FontAwesomeIcon>

                        <div>
                            {openMenu === "orders" && (
                                <div className={openMenu === "orders" ? "submenu submenu-open" : "submenu"}>
                                    <Link to="/orders-new" className='submenu-item submenu-item_click'>
                                        Đơn hàng mới
                                    </Link>
                                    <Link to="/orders-cancel" className='submenu-item '>
                                        Yêu cầu hủy đơn
                                    </Link>
                                    <Link to="/orders-is-being-delivered" className='submenu-item'>
                                        Đơn hàng đang giao
                                    </Link>
                                    <Link to="/orders-delivered" className='submenu-item'>
                                        Đơn hàng đã giao
                                    </Link>
                                    {/* <Link to="/orders-list" className='submenu-item'>
                                        Danh sách đơn hàng
                                    </Link> */}
                                </div>
                            )}
                        </div>
                    </Link>
                </li>

                <li>
                    <Link className={openMenu === "manage-voucher-store" ? 'itemStyle-click itemStyle' : 'itemStyle'}   onClick={() => handleMenuClick("manage-voucher-store")} to="/manage-voucher-store">
                        <FontAwesomeIcon className='mr-5' icon={faTicket}></FontAwesomeIcon>
                        Quản lý Voucher</Link>
                </li>

                <li>
                    <Link className={openMenu === "statistical" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("statistical")}>
                        <FontAwesomeIcon className='mr-5' icon={faChartSimple}></FontAwesomeIcon>
                        Thống kê cửa hàng
                        <FontAwesomeIcon className='faAngleDown' icon={openMenu === "statistical" ? faAngleUp : faAngleDown}></FontAwesomeIcon>

                            {openMenu === "statistical" && (
                                <div className="submenu">
                                    <Link to="/best-selling-products" className='submenu-item submenu-item_click'>
                                        Sản phẩm bán chạy
                                    </Link>
                                    <Link to="/order-statistics" className='submenu-item '>
                                        Thống kê đơn hàng
                                    </Link>
                                    <Link to="/revenue-statistics" className='submenu-item'>
                                        Thống kê doanh thu
                                    </Link>
                                </div>
                            )}
                        
                    </Link>
                </li>

                <li>
                    <Link className={openMenu === "transaction-history" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("transaction-history")} to="/transaction-history">
                        <FontAwesomeIcon className='mr-5' icon={faClockRotateLeft}></FontAwesomeIcon>
                        Lịch sử giao dịch</Link>
                </li>

                <li>
                    <Link className={openMenu === "bankrupt" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("bankrupt")} to="/bankrupt">
                        <FontAwesomeIcon className='mr-5' icon={faOutdent}></FontAwesomeIcon>
                        Đóng cửa hàng</Link>
                </li>

            </ul>
        </nav>
    );
};


export default Sidebar;
