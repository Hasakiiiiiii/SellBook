import React from 'react';

import './Statistical.css'

import ApexChartTop from '../../chart/ApexChartTop';
import ListBestSelling from '../../utils/ManageListUI/ListBestSelling';

const BestSellingProducts = () => {
    return (
        <div className="page scroll-container">
            <div className="container">
                <ApexChartTop/>

                <ListBestSelling/>
            </div>
        </div>
    );
};

export default BestSellingProducts;