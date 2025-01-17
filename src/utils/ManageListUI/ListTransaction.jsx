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
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import VoucherForm from '../FormVisible/VoucherForm';
import Notification from '../Notification/Notification';

const Book = {
    name: '',

};

const ListTransaction = ({ listBooks, keySearch }) => {

    const [productCount, setProductCount] = useState(25);
    const [pagination, setPagination] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const [checkedProducts, setCheckedProducts] = useState(Array(10).fill(false)); // Mảng cho 10 sản phẩm
    const [isCheckedAll, setIsCheckedAll] = useState(false); // check all sp khi bấm chọn tất cả
    const [selectedValue, setSelectedValue] = useState(10); // số lượng sản phẩm hiển thị mỗi trang
    const [deleteall, setDeleteAll] = useState(false); // trang thái nút xóa

    const indexOfLastItem = currentPage * selectedValue;
    const indexOfFirstItem = indexOfLastItem - selectedValue;
    // const currentItems = listBooks.slice(indexOfFirstItem, indexOfLastItem);

    const [selectedBook, setSelectedBook] = useState(null); // Trạng thái lưu thông tin sách đang xem
    const [isDetailVisible, setDetailVisible] = useState(false); // Trạng thái hiển thị chi tiết sách
    const [notificationDelAll, setNotificationDelAll] = useState(false); // Trạng thái hiển thị thông báo của del all
    const [notificationDelBook, setNotificationDelBook] = useState(false); // Trạng thái hiển thị thông báo của del từng sản phẩm
    const [maVoucher, setMaVoucher] = useState(''); // Trạng thái hiển thị thông báo của del từng sản phẩm
    const [exportExcel, setExportExcel] = useState(false); // Từ khóa tìm kiếm

    // * trạng thái voucher
    const [isHanSuDung, setIsHanSuDung] = useState(true);


    // ** Ẩn hiện form chi tiết sản phẩm
    const handleShowDetails = (trangthai) => {
        // setSelectedBook(book); // Lưu thông tin sách vào state
        setDetailVisible(true); // Hiển thị giao diện chi tiết
        if (trangthai === 'conhan') {
            setIsHanSuDung(true);
        } else {
            setIsHanSuDung(false);
        }
    };
    const handleCloseDetails = () => {
        setDetailVisible(false); // Đóng giao diện chi tiết
        // setSelectedBook(null); // Xóa thông tin sách
    };

    // ẩn hiện form thông báo del all
    const handleShowDelAll = () => {
        setNotificationDelAll(true); // Hiển thị giao diện thông báo
    };
    const handleCloseDelAll = () => {
        setNotificationDelAll(false); // Đóng giao diện thông báo
    };
    const handleApplyDelAll = () => { }

    // xóa từng sản phẩm
    const handleShowDelBook = (id) => {
        setNotificationDelBook(true);
        setMaVoucher(id);
    }
    const handleCloseDelBook = (name) => {
        setNotificationDelBook(false);
        setMaVoucher('');
    }
    const handleApplyDelBook = (id) => {
        // Xử lý xóa sản phẩm
        console.log(`Xóa sản phẩm: ${id}`);
    }

    // xuất sản phẩm ra file excel
    const handleShowExcel = () => {
        setExportExcel(true);
    }
    const handleCloseExcel = () => {
        setExportExcel(false);
    }
    const handleApplyExcel = () => {
        // Xử lý xóa sản phẩm
        console.log('Excel')
    }


    // click từng sản phẩm
    const handleCheckProduct = (index) => {

        setCheckedProducts(Array(selectedValue))

        const updatedCheckedProducts = checkedProducts.map((checked, idx) =>
            idx === index ? !checked : checked // Chỉ thay đổi trạng thái của sản phẩm được chọn
        );

        setCheckedProducts(updatedCheckedProducts);
        setDeleteAll(updatedCheckedProducts.some(checked => checked));
        // Cập nhật trạng thái "Chọn tất cả" nếu tất cả sản phẩm đều được chọn
        setIsCheckedAll(updatedCheckedProducts.every(checked => checked));

    };

    // chọn tất cả sản phẩm
    const handleCheckAll = () => {
        const newCheckedState = !isCheckedAll;
        setIsCheckedAll(newCheckedState);
        setDeleteAll(newCheckedState);
        setCheckedProducts(Array(selectedValue).fill(newCheckedState)); // Cập nhật tất cả sản phẩm
    };

    // click vào cái nào
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('Selected value:', event.target.value); // In ra giá trị được chọn
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)

        console.log(currentPage);
    }

    useEffect(() => {
        setPagination(Math.ceil(productCount / selectedValue)); // số trang tổng cộng
    }, [selectedValue]);

    //* const tableRows = currentItems.map((book, index) => ());
    const tableRows = Array.from({ length: selectedValue }).map((_, index) => (
        <tr key={index}>
            <td style={{ width: '60px', textAlign: 'center' }}> <span>{index + 1 + indexOfFirstItem}</span>
            </td>

            <td style={{ width: '180px', textAlign: 'center' }}>903238</td>
            <td className='rut' style={{ width: '150px', textAlign: 'center' }}>Rút</td>
            <td style={{ width: '110px', textAlign: 'center' }}>21/10/2024</td>
            <td style={{ width: '110px', textAlign: 'center' }}>2.000.000</td>
            <td style={{ width: '110px', textAlign: 'center' }}>3.000.000</td>
            <td style={{ width: '170px', textAlign: 'center' }}>1.000.000</td>
        </tr>
    ));

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
                    <div className="gr-btn">
                        {deleteall ? (
                            <>
                                <button className="btn-deleteall btn-deleteall_update" onClick={handleShowDelAll}>
                                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                                </button>
                            </>
                        ) : null}

                        {/* <button className="btn-deleteall">
                                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                            </button> */}


                    </div>

                </div>

                {/* danh sách sản phẩm */}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '60px', textAlign: 'center'}}>
                                    Stt
                                </th>
                                <th style={{ width: '180px', textAlign: 'center' }}>Mã giao dịch</th>
                                <th style={{ width: '160px', textAlign: 'center' }}>Loại giao dịch</th>
                                <th style={{ width: '160px', textAlign: 'center' }}>Ngày giao dịch</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Số tiền đã rút</th>
                                <th style={{ width: '190px', textAlign: 'center' }}>Số tiền trước giao dịch</th>
                                <th style={{ width: '190px', textAlign: 'center' }}>Số tiền sau giao dịch</th>
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
                isDetailVisible && (
                    <VoucherForm
                        keyForm={'detailVoucher'}
                        onClose={handleCloseDetails}
                        nameShop={'Sunrise2.vn'}
                        isHanSuDung={isHanSuDung}
                    />
                )
            }

            {
                notificationDelAll && (
                    <Notification
                        title={'Xóa voucher'}
                        content={'Bạn muốn xóa các voucher đã chọn?'}
                        onClose={handleCloseDelAll}
                        onApply={handleApplyDelAll} />

                )
            }

            {
                notificationDelBook && (
                    <Notification
                        title={'Xóa voucher'}
                        content={`Bạn muốn xóa voucher: ${maVoucher}`}
                        onClose={handleCloseDelBook}
                        onApply={handleApplyDelBook} />
                )
            }
        </div>
    );
};

export default ListTransaction;