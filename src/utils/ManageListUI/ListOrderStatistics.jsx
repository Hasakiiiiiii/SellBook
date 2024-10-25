import React, { useEffect, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./ListProduct.css";
import Pagination from '../Pagination/Pagination';

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import OrderForm from '../FormVisible/OrderForm';
import PrintBill from '../FormVisible/PrintBill';
import Notification from '../Notification/Notification';

const Book = {
    name: '',

};

const ListOrderStatistics = ({ listOrders, keySearch, status, statusHeader }) => {

    const orderId = '12'

    const [productCount, setProductCount] = useState(25);
    const [pagination, setPagination] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedValue, setSelectedValue] = useState(10); // số lượng sản phẩm hiển thị mỗi trang
    const [deleteall, setDeleteAll] = useState(false); // trang thái nút xóa

    const indexOfLastItem = currentPage * selectedValue;
    const indexOfFirstItem = indexOfLastItem - selectedValue;
    // const currentItems = listBooks.slice(indexOfFirstItem, indexOfLastItem);

    const [selectedOrder, setSelectedOrder] = useState(''); // Trạng thái lưu thông tin sách đang xem
    const [isDetailVisible, setDetailVisible] = useState(false); // Trạng thái hiển thị chi tiết sách
    // Trạng thái hiển thị thông báo của del all

    const [isDetailOrder, setIsDetailOrder] = useState(false);
    const [notificationApplyOrder, setNotificationApplyOrder] = useState(false);
    const [isPrintBill, setIsPrintBill] = useState(false);

    // ** Ẩn hiện form chi tiết đơn hàng
    const handleShowDetailOrder = (orderId) => {
        // setSelectedOrder(orderId); 3
        setIsDetailOrder(true);
        console.log(orderId);

    };
    const handleCloseDetailOrder = () => {
        setIsDetailOrder(false); // Đóng giao diện chi tiết
        // setSelectedBook(null); // Xóa thông tin sách
    };

    // * * ẩn hiện form thông báo xác nhận đơn hàng
    const handleShowApplyOrder = (id) => {
        setSelectedOrder(id)
        setNotificationApplyOrder(true);
    };
    const handleCloseApplyOrder = () => {
        setNotificationApplyOrder(false);
        setSelectedOrder('');
    };
    const handleApplyApplyOrder = () => {
        console.log('Applying: ' + selectedOrder);
        // setNotificationApplyOrder(false);
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

    // * xác nhận hủy hàng (click vào nút xác nhận)
    const handleCancelOrder = (orderId) => {
        alert(`Cancelled order ${orderId}`);
    }

    //* click vào trang mấy
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('Selected value:', event.target.value); // In ra giá trị được chọn
    };

    const alertHandle = () => {
        alert('hi');
    }

    //* const tableRows = currentItems.map((book, index) => ());
    const tableRows = Array.from({ length: selectedValue }).map((_, index) => (
        <tr key={index}>
            <td>
                <span className='stt'>{index + 1 + indexOfFirstItem}</span>
            </td>

            {/* <td style={{ width: '120px', textAlign: 'center' }}>
                <img src="/images/sach.jpg" alt="book" />
            </td> */}
            <td style={{ width: '150px', textAlign: 'center' }}>20232</td>
            <td style={{ width: '100px', textAlign: 'center' }}>2</td>
            <td style={{ width: '100px', textAlign: 'center' }}>5</td>
            <td style={{ width: '170px', textAlign: 'center' }}>120.000</td>
            <td style={{ width: '170px', textAlign: 'center' }}>20.000</td>
            <td style={{ width: '170px', textAlign: 'center' }}>100.000</td>
            {/* xác nhận */}
            {
                status === 'xacnhan' && (
                    <td style={{ width: '220px', textAlign: 'center' }} >
                        <button onClick={() => handleShowApplyOrder(orderId)} className={status}>Xác nhận</button>
                    </td>
                )
            }
            {/* hủy đơn */}
            {
                status === 'huydon' && (
                    <td style={{ width: '220px', textAlign: 'center' }} >
                        <button onClick={() => handleCancelOrder(orderId)} className={status}>Đã hủy</button>
                    </td>
                )
            }
            {/* đang vận chuyển */}
            {
                status === 'danggiao' && (
                    <td style={{ width: '220px', textAlign: 'center' }} >
                        <button onClick={alertHandle} className={status}>Đang vận chuyển</button>
                    </td>
                )
            }
            {/* đã giao hàng */}
            {
                status === 'dagiao' && (
                    <td style={{ width: '220px', textAlign: 'center' }} >
                        <button onClick={alertHandle} className={status}>Đã giao hàng</button>
                    </td>
                )
            }

            <td style={{ width: '100px', textAlign: 'center' }}>
                {/* xác nhận */}
                {
                    status === 'xacnhan' && (
                        <>
                            <button type="button" onClick={() => handleShowDetailOrder(orderId)}>
                                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                            </button>
                            <button onClick={handleShowPrintBill}>
                                <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>
                            </button>
                        </>
                    )
                }
                {/* hủy đơn */}
                {
                    status === 'huydon' && (
                        <button type="button" onClick={() => handleShowDetailOrder(orderId)}>
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                        </button>
                    )
                }
                {/* đang vận chuyển */}
                {
                    status === 'danggiao' && (
                        <button type="button" onClick={() => handleShowDetailOrder(orderId)}>
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                        </button>
                    )
                }
                {/* đã giao hàng */}
                {
                    status === 'dagiao' && (
                        <button type="button" onClick={() => handleShowDetailOrder(orderId)}>
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                        </button>
                    )
                }

            </td>
        </tr>
    ));

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)

        console.log(currentPage);
    }

    useEffect(() => {
        setPagination(Math.ceil(productCount / selectedValue)); // số trang tổng cộng
    }, [selectedValue]);

    return (
        <div>
            {/* hiển thị danh sách sản phẩm */}
            <div className="product-list">
                <div className="product-list_pages">
                    <span>Hiển thị</span>
                    <select id="disabledSelect" className="form-select"
                        value={selectedValue} onChange={handleSelectChange}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span style={{ color: "#757B82" }}>Trang 1 - {pagination}</span>
                </div>

                {/* danh sách sản phẩm */}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '40px', textAlign: 'center' }}>
                                    Stt
                                </th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Mã đơn hàng</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Sản phẩm</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Số lượng</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Đơn giá</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Giảm giá</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Thành tiền</th>
                                {/* <th style={{ width: '100px', textAlign: 'center' }}>Đã bán</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Còn hàng</th> */}
                                <th style={{ width: '220px', textAlign: 'center' }}>Trạng thái</th>
                                <th style={{ width: '100px', textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody style={{ marginTop: '10px' }}>
                            {tableRows}
                        </tbody>
                    </table>


                </div>
            </div>


            {/* <FontAwesomeIcon className='pagination-icon' icon={faAngleLeft}></FontAwesomeIcon> */}
            <Pagination totalPages={pagination} onPageChange={handlePageChange}></Pagination>
            {/* <FontAwesomeIcon className='pagination-icon' icon={faAngleRight}></FontAwesomeIcon> */}

            {//selectedBook
                isDetailOrder && (
                    <OrderForm
                        onClose={handleCloseDetailOrder}
                        status={status}
                        statusHeader={statusHeader}
                    />
                )
            }
            {
                notificationApplyOrder && status === 'xacnhan' && (
                    <Notification
                        title={'Xác nhận đơn hàng'}
                        content={'Khi bấm xác nhận đồng nghĩa với việc bạn thông báo cho khách hàng biết rằng: “Sản phẩm đã được đóng gói và chuyển giao cho dịch vụ vận chuyển"'}
                        onClose={handleCloseApplyOrder}
                        onApply={handleApplyApplyOrder(orderId)} />
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

export default ListOrderStatistics;