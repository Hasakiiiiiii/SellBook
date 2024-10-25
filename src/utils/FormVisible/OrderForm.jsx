import React, { useEffect, useState } from 'react';

import './FormVisibleAll.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Notification from '../Notification/Notification';
import PrintBill from './PrintBill';

const OrderForm = ({ listOrders, onClose, onCancel, onApply, onPrintBill, status, statusHeader }) => {

    const maDonHang = '203213'; // listOrder.id

    const [notificationCancelOrder, setNotificationCancelOrder] = useState(false);
    const [notificationApplyOrder, setNotificationApplyOrder] = useState(false);
    const [isPrintBill, setIsPrintBill] = useState(false);


    const orderRows = () => {
        const rows = [];

        for (let i = 0; i < 1; i++) {
            rows.push(
                <tr className='order-form_tbody__row'>
                    <td style={{ width: '20px' }}>33</td>
                    <td style={{ width: '120px' }}><img className='order-form_img' src="/images/sach.jpg" alt="book" /></td>
                    <td style={{ width: '170px' }}>Người Thầy</td>
                    <td style={{ width: '100px' }}>2</td>
                    <td style={{ width: '120px' }}>120.000</td>
                    <td style={{ width: '120px' }}>240.000</td>
                </tr>);
        }

        return rows;

    }

    // * * ẩn hiện form thông báo hủy đơn
    const handleShowCancelOrder = () => {
        setNotificationCancelOrder(true);
    };
    const handleCloseCancelOrder = () => {
        setNotificationCancelOrder(false);
    };
    const handleApplyCancelOrder = (id) => {
        console.log('Cancelling: ' + id);
    }

    // * * ẩn hiện form thông báo xác nhận đơn hàng
    const handleShowApplyOrder = () => {
        setNotificationApplyOrder(true);
    };
    const handleCloseApplyOrder = () => {
        setNotificationApplyOrder(false);
    };
    const handleApplyApplyOrder = (id) => {
        console.log('Applying: ' + id);
    }

    //* hiện form printbill
    const handleShowPrintBill = () => {
        setIsPrintBill(true);

    }
    const handleClosePrintBill = () => {
        setIsPrintBill(false);

    }
    const handleApplyPrintBill = () => {

    }

    // * Xác nhận hủy đơn
    const handleCancelOrder = () => {
        alert('Cancelled order');
        onClose();
    }

    const totalPrice = () => { return 100000 }

    // const orderRow = () => {
    //     let totalPrice = 0;
    //     return listBook.map((book, index) => {
    //         totalPrice += book.totalPrice;
    //         return (
    //             <tr key={index}>
    //                 <td>{index + 1}</td>
    //                 <td><img src={book.img} alt={book.name} width="50" /></td>
    //                 <td>{book.name}</td>
    //                 <td>{book.quantity}</td>
    //                 <td>{book.price}</td>
    //                 <td>{book.totalPrice}</td>
    //             </tr>
    //         );
    //     });
    // }

    return (

        <div className="bg_black">
            <div className="order-form">
                <div className="addnewbook-header">
                    <h3>Mã đơn hàng: 20321323 <span className={status}>{statusHeader}</span></h3>
                    <FontAwesomeIcon onClick={onClose} style={{ cursor: 'pointer' }} className="faXmark" icon={faXmark}></FontAwesomeIcon>
                </div>
                {/* table thông tin từng sản phẩm trong đơn hàng */}
                <h3 style={{ marginTop: '10px' }}>Thông tin đơn hàng:</h3>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '20px' }}>Stt</th>
                            <th style={{ width: '120px' }}>Hình ảnh</th>
                            <th style={{ width: '170px' }}>Tên sản phẩm</th>
                            <th style={{ width: '100px' }}>Số lượng</th>
                            <th style={{ width: '120px' }}>Giá</th>
                            <th style={{ width: '120px' }}>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className='order-form_tbody' style={{ marginTop: '10px' }}>
                        {orderRows()}
                    </tbody>
                </table>
                {/* ======================== */}

                {/* thông tin chi tiết */}
                <div className="order-form_info">
                    <p style={{ marginTop: '10px' }}>
                        <strong>Người nhận:</strong> Thánh Boom Hàng
                        <strong style={{ marginLeft: '70px' }}>Số điện thoại: </strong>0972376536
                    </p>
                    <p><strong>Địa chỉ:</strong> 123 Lê Văn Thái, Quận 1, TP. HCM</p>
                    <p><strong>Phương thức thanh toán:</strong> Chuyển tiền khi nhận hàng</p>
                    <p><strong>Phí vận chuyển:</strong> 10.000đ</p>
                    <p><strong>Giảm giá:</strong> 10.000đ ( SUNRISESALE10k )</p>
                    <p><strong>Lời nhắn:</strong> Giao hàng nhanh giúp em nhe shop :()</p>
                    <p style={{ fontSize: '23px' }}><strong>Tổng tiền:</strong> {totalPrice()}đ</p>
                </div>

                {/* button */}
                <div className="order-form_button">
                    {
                        status === 'xacnhan' && (
                            <>
                                <button onClick={handleShowCancelOrder}>Hủy đơn</button>
                                <button onClick={handleShowApplyOrder}>Xác nhận đặt hàng</button>
                                <button onClick={handleShowPrintBill}>In hóa đơn</button>
                            </>
                        )
                    }
                    {
                        status === 'huydon' && (
                            <>
                                <button onClick={handleCancelOrder}>Xác nhận hủy đơn</button>
                            </>
                        )
                    }

                </div>
            </div>

            {
                notificationCancelOrder && (
                    <Notification
                        title={'Hủy đơn hàng'}
                        content={'Bạn chắc chắn muốn hủy đơn hàng này?'}
                        onClose={handleCloseCancelOrder}
                        onApply={handleApplyCancelOrder(maDonHang)} />
                )
            }
            {
                notificationApplyOrder && (
                    <Notification
                        title={'Xác nhận đơn hàng'}
                        content={'Khi bấm xác nhận đồng nghĩa với việc bạn thông báo cho khách hàng biết rằng: “Sản phẩm đã được đóng gói và chuyển giao cho dịch vụ vận chuyển"'}
                        onClose={handleCloseApplyOrder}
                        onApply={handleApplyApplyOrder(maDonHang)} />
                )
            }
            {
                notificationCancelOrder && (
                    <Notification
                        title={'Hủy đơn hàng'}
                        content={'Bạn chắc chắn muốn hủy đơn hàng này?'}
                        onClose={handleCloseApplyOrder}
                        onApply={handleApplyApplyOrder(maDonHang)} />
                )
            }

            {
                isPrintBill && (
                    <PrintBill onClose={handleClosePrintBill} onApply={handleApplyPrintBill} />
                )
            }

        </div>
    );
};

export default OrderForm;