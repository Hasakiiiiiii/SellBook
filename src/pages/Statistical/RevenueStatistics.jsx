import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

import "./Statistical.css";
import ApexChartRevenue from '../../chart/ApexChartRevenue';

import CashOutForm from '../../utils/CashOutForm/CashOutForm';

const RevenueStatistics = () => {
    return (
        <div className="page scroll-container">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div>
                        {/* tổng quan */}
                        <div className="productbtn-list">
                            <button className="productbtn-item btn1 btn-update">
                                <p>Doanh thu ước tính hôm nay</p>
                                <h1>
                                    20.000.000 <span>VNĐ</span>
                                </h1>
                                <p>120 đơn hàng</p>
                            </button>
                            <button className="productbtn-item btn2 btn-update">
                                <p>Tổng doanh thu cửa hàng</p>
                                <h1>
                                    123.000.000 <span>VNĐ</span>
                                </h1>
                                <p>Sunrise2.vn - 108 days</p>
                            </button>
                        </div>

                        {/* sản phẩm có doanh thu cao nhất */}
                        <div className="product-revenue">
                            <div className="product-revenue-item">
                                <div className="product-revenue-book">
                                    <img src="/images/sach.jpg" alt="book"/>
                                    <div className="product-revenue-book_name">
                                        <h5>Sách hướng dẫn trở thành Pro Trader</h5>
                                        <p>Bán chạy nhất</p>
                                    </div>
                                </div>
                                <div className="product-revenue-info">
                                    <div className="product-revenue-info_col1">
                                        <span>Số lượt bán</span>
                                        <p>21.279</p>
                                    </div>
                                    <div className="product-revenue-info_col2">
                                        <span>Doanh thu</span>
                                        <p>102.023.000 VNĐ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="product-revenue-item">
                                <div className="product-revenue-book">
                                    <img src="/images/sach.jpg" alt="book"/>
                                    <div className="product-revenue-book_name">
                                        <h5>Sách hướng dẫn trở thành Pro Trader</h5>
                                        <p>Bán chạy nhất</p>
                                    </div>
                                </div>
                                <div className="product-revenue-info">
                                    <div className="product-revenue-info_col1">
                                        <span>Số lượt bán</span>
                                        <p>21.279</p>
                                    </div>
                                    <div className="product-revenue-info_col2">
                                        <span>Doanh thu</span>
                                        <p>102.023.000 VNĐ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="product-revenue-item">
                                <div className="product-revenue-book">
                                    <img src="/images/sach.jpg" alt="book"/>
                                    <div className="product-revenue-book_name">
                                        <h5>Sách hướng dẫn trở thành Pro Trader</h5>
                                        <p>Bán chạy nhất</p>
                                    </div>
                                </div>
                                <div className="product-revenue-info">
                                    <div className="product-revenue-info_col1">
                                        <span>Số lượt bán</span>
                                        <p>21.279</p>
                                    </div>
                                    <div className="product-revenue-info_col2">
                                        <span>Doanh thu</span>
                                        <p>102.023.000 VNĐ</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>


                    <div>
                        <CashOutForm />

                        <div className="payment-method">
                            <h4>Doanh thu theo phương thức thanh toán</h4>
                            <div>
                                <FontAwesomeIcon className="icon-payment" icon={faDollarSign}></FontAwesomeIcon>
                                <p>Thanh toán khi nhận hàng</p>
                            </div>
                            <h3>999.999.999 <span>VNĐ</span></h3>
                            <div>
                                <FontAwesomeIcon className="icon-payment" icon={faCreditCard}></FontAwesomeIcon>
                                <p>Thanh toán online</p>
                            </div>
                            <h3>999.999.999 <span>VNĐ</span></h3>
                        </div>
                    </div>


                </div>

                <div style={{marginTop: '20px'}}>
                <ApexChartRevenue />
                </div>
                
            </div>
        </div>
    );
};

export default RevenueStatistics;
