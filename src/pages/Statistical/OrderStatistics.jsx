import React from 'react';

import './Statistical.css'
import '../ManageProduct/ManageProduct.css';

import ApexChartOrder from '../../chart/ApexChartOrder';
import ListOrderStatistics from '../../utils/ManageListUI/ListOrderStatistics';

const OrderStatistics = () => {
    return (
        <div className="page scroll-container">
            <div className="container">
                <ApexChartOrder/>
                <div style={{textAlign: 'center' }} className="productbtn-list">
                    <button className="productbtn-item btn1">
                        <p>Tổng đơn hàng</p>
                        <h1>123</h1>
                    </button>
                    <button className="productbtn-item btn2">
                        <p>Đơn hàng đã hủy</p>
                        <h1>123</h1>
                    </button>
                    <button className="productbtn-item btn3">
                        <p>Đơn hàng đã giao</p>
                        <h1>123</h1>
                    </button>
                </div>
                <ListOrderStatistics/>
            </div>
        </div>
    );
};

export default OrderStatistics;