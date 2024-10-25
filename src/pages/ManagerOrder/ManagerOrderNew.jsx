import React, { useEffect, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


import "../ManageProduct/ManageProduct.css";
import "./ManagerOrder.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ListOrder from "../../utils/ManageListUI/ListOrder";

const ManagerOrder = () => {


    return (
        <div className="page scroll-container">
            <div className="container">


                {/* 4 nút đầu */}
                <div className="productbtn-list">
                    <button className="productbtn-item btn1 no-hover">
                        <p>Đơn hàng mới</p>
                        <h1>123</h1>
                    </button>
                    <button className="productbtn-item btn2 no-hover productbtn-item_update">
                        <p>Doanh thu ước tính</p>
                        <h1>123.456.789<span> VNĐ</span></h1>
                    </button>
                </div>
                {/* 3 thanh tìm kiếm */}
                <div className="product-search_list">
                    <div className="product-search_item">
                        <label>Mã đơn hàng</label>
                        <div className="product-search_item__flex">
                            <input type="text" className="form-control" />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    <div className="product-search_item">
                        <label>Ngày đặt hàng</label>
                        <div className="product-search_item__flex">
                            <input 
                                type="date"
                                className="form-control" 
                            />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    <div className="product-search_item">
                        <label>Tên sách</label>
                        <div
                            style={{ width: "350px" }}
                            className="product-search_item__flex"
                        >
                            <input
                                type="text"
                                className="form-control"
                            />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>

                <ListOrder status={'xacnhan'} statusHeader={'xác nhận đơn hàng'}/>

            </div>
        </div>
    );
};

export default ManagerOrder;