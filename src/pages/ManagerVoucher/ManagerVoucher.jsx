import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../ManageProduct/ManageProduct.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ListVoucher from '../../utils/ManageListUI/ListVoucher';
import VoucherForm from '../../utils/FormVisible/VoucherForm';

import { getCuaHangById } from "../../utils/API/StoreAPI";
import { getVouchersByCuaHangId } from "../../utils/API/VoucherAPI";

const ManagerVoucher = () => {

    // *Hàm lấy ra tất cả vouchers
    const [vouchers, setVouchers] = useState([]);
    // *Lấy thông tin cửa hàng
    const [shop, setShop] = useState({});
    // * Số lượng voucher
    const [vouchersCount, setVouchersCount] = useState([]);

    const [isAddVoucherForm, setIsAddVoucherForm] = useState(false);

    // *Hiện, ẩn form tạo voucher mới
    const handleShowAddVoucherForm = () => {
        setIsAddVoucherForm(!isAddVoucherForm);
    };
    const handleCloseAddVoucherForm = () => {
        setIsAddVoucherForm(false);
    };


    useEffect(() => {

        const fetchVouchers = () => {
            getVouchersByCuaHangId()
                .then(data => {
                    setVouchers(data);
                    setVouchersCount(data.length);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        const fetchShop = () => {
            getCuaHangById()
                .then(data => {
                    setShop(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchVouchers();
        fetchShop();
    }, [])

    return (
        <div className="page scroll-container">
            <div className="container">
                {/* 4 nút đầu */}
                <div className="productbtn-list">
                    <button className="productbtn-item btn1">
                        <p>Tổng Voucher</p>
                        <h1>{vouchersCount}</h1>
                    </button>
                    <button className="productbtn-item btn2">
                        <p>Voucher đang lưu hành</p>
                        <h1>6</h1>
                    </button>
                    <button className="productbtn-item btn3">
                        <p>Voucher chưa lưu hành</p>
                        <h1>2</h1>
                    </button>
                    <button className="productbtn-item btn3">
                        <p>Voucher hết hạn</p>
                        <h1>2</h1>
                    </button>
                </div>
                {/* 3 thanh tìm kiếm */}
                <div className="product-search_list">
                    <div className="product-search_item">
                        <label>Mã voucher</label>
                        <div className="product-search_item__flex">
                            <input type="text" className="form-control" />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    <div className="product-search_item">
                        <label>Số tiền giảm</label>
                        <div className="product-search_item__flex">
                            <input type="text" className="form-control" />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    <div className="product-search_item">
                        <label>Ngày tạo voucher</label>
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
                    <div>
                        <button
                            onClick={handleShowAddVoucherForm}
                            className="product-search_btnadd">+ Thêm Voucher</button>
                    </div>
                </div>

                <ListVoucher listVouchers={vouchers} />

                {
                    isAddVoucherForm && (
                        <VoucherForm
                            keyForm={'addVoucher'}
                            onClose={handleCloseAddVoucherForm}
                            nameShop={shop.ten_cua_hang} />
                    )
                }

            </div>
        </div>
    );
};

export default ManagerVoucher;