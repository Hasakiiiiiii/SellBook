import React from 'react';

import './TransactionHistory.css'
import ListTransaction from '../../utils/ManageListUI/ListTransaction';

const TransactionHistory = () => {
    return (
        <div className="page scroll-container">
            <div className="container">

                <div className="productbtn-list">
                    <button className="productbtn-item btn1">
                        <p>Số giao dịch</p>
                        <h1>
                            20
                        </h1>
                    </button>
                </div>

                <ListTransaction />
            </div>
        </div>
    );
};

export default TransactionHistory;