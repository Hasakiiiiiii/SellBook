import React, { useEffect, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./ListProduct.css";
import Pagination from '../Pagination/Pagination';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";


import VoucherForm from '../FormVisible/VoucherForm';
import Notification from '../Notification/Notification';


const ListProduct = ({ listVouchers = [], keySearch }) => {

    // * Tất cả vouchers
    const [voucherList, setVoucherList] = useState([]);

    const [productCount, setProductCount] = useState(listVouchers.length);

    const [selectedBook, setSelectedBook] = useState(null); // Trạng thái lưu thông tin sách đang xem
    const [isDetailVisible, setDetailVisible] = useState(false); // Trạng thái hiển thị chi tiết sách
    const [notificationDelAll, setNotificationDelAll] = useState(false); // Trạng thái hiển thị thông báo của del all
    const [notificationDelBook, setNotificationDelBook] = useState(false); // Trạng thái hiển thị thông báo của del từng sản phẩm
    const [maVoucher, setMaVoucher] = useState(''); // Trạng thái hiển thị thông báo của del từng sản phẩm
    const [exportExcel, setExportExcel] = useState(false); // Từ khóa tìm kiếm

    // *Phân trang
    const [pagination, setPagination] = useState();
    // * Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    // * Mỗi trang 10 sản phẩm
    const [checkedProducts, setCheckedProducts] = useState(Array(10).fill(false)); // Mảng cho 10 sản phẩm
    const [isCheckedAll, setIsCheckedAll] = useState(false); // check all sp khi bấm chọn tất cả
    const [selectedValue, setSelectedValue] = useState(10); // số lượng sản phẩm hiển thị mỗi trang
    const [deleteall, setDeleteAll] = useState(false); // trang thái nút xóa

    // *Trang được chọn
    const indexOfLastItem = currentPage * selectedValue;
    const indexOfFirstItem = indexOfLastItem - selectedValue;

    // * trạng thái voucher
    const [voucherID, setVoucherID] = useState();


    // ** Ẩn hiện form chi tiết sản phẩm
    const handleShowDetails = (voucherID) => {
        // setSelectedBook(book); // Lưu thông tin sách vào state
        setDetailVisible(true); // Hiển thị giao diện chi tiết
        setVoucherID(voucherID)
    };
    const handleCloseDetails = () => {
        setDetailVisible(false); // Đóng giao diện chi tiết
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

    // * Click vào trang mấy
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)

        console.log(currentPage);
    }


    //* click từng sản phẩm
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

    //* chọn tất cả sản phẩm
    const handleCheckAll = () => {
        const newCheckedState = !isCheckedAll;
        setIsCheckedAll(newCheckedState);
        setDeleteAll(newCheckedState);
        setCheckedProducts(Array(selectedValue).fill(newCheckedState)); // Cập nhật tất cả sản phẩm
    };

    //* click vào cái nào
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const currentProducts = Array.isArray(voucherList)
        ? voucherList.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const getStatusInt = (statusInt) => {
        switch (statusInt) {
            case 0:
                return 'chuaapdung';
            case 1:
                return 'hethan';
            case 2:
            default:
                return 'conhan';
        }
    };

    const getStatusText = (statusInt, ngayKetThuc) => {
        const currentDate = new Date();
        const endDate = new Date(ngayKetThuc);

        switch (statusInt) {
            case 0:
                return 'Chưa áp dụng';
            case 1:
                return 'Hết hạn';
            case 2:
            default:
                const remainingDays = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
                return remainingDays > 0 ? `Còn ${remainingDays} ngày` : 'Hết hạn';
        }
    };
    

    //* const tableRows = currentItems.map((book, index) => ());
    const tableRows = currentProducts.map((voucher, index) => (
        <tr key={index}>
            <td style={{ width: '60px' }}>
                <input type="checkbox"
                    checked={isCheckedAll || checkedProducts[index]} // Checkbox cho từng sản phẩm
                    onChange={() => handleCheckProduct(index)}></input> <span>{index + 1 + indexOfFirstItem}</span>
            </td>

            <td style={{ width: '120px' }}>{voucher.ten_voucher}</td>
            <td style={{ width: '150px', textAlign: 'center' }}>{voucher.giam_gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td style={{ width: '110px', textAlign: 'center' }}>{voucher.ngay_bat_dau}</td>
            <td style={{ width: '110px', textAlign: 'center' }}>{voucher.ngay_het_han}</td>
            <td style={{ width: '110px', textAlign: 'center' }}>{voucher.so_lan_dung}</td>
            <td style={{ width: '110px', textAlign: 'center' }}>{voucher.gia_ap_dung.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td style={{ width: '170px', textAlign: 'center' }}>{voucher.dieu_kien}</td>
            <td style={{ width: '170px', textAlign: 'center', fontWeight: '500' }} >
                <span
                    className={getStatusInt(voucher.trangThai)}>
                    {getStatusText(voucher.trangThai, voucher.ngay_het_han)}
                </span>
            </td>
            <td style={{ width: '100px', textAlign: 'center' }}>
                <button type="button" onClick={() => handleShowDetails(voucher.id_voucher)}>
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                </button>
                <button onClick={() => handleShowDelBook('SUNRISESALE20K')}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </button>
            </td>
        </tr>
    ));

    useEffect(() => {
        setVoucherList(listVouchers);
        const totalProducts = listVouchers.length;
        setPagination(Math.ceil(totalProducts / selectedValue)); // số trang tổng cộng
    }, [selectedValue, listVouchers]);

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
                    <span style={{ color: "#757B82" }}>Trang {currentPage} - {pagination}</span>
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
                                <th style={{ width: '60px' }}>
                                    <input type="checkbox"
                                        checked={isCheckedAll}
                                        onChange={handleCheckAll}></input>Stt
                                </th>
                                <th style={{ width: '120px' }}>Mã Voucher</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Giá giảm</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Ngày bắt đầu</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Ngày hết hạn</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Số lần dùng</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Giá áp dụng</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Điều kiện áp dụng</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Trạng thái</th>
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
                isDetailVisible && (
                    <VoucherForm
                        keyForm={'addVoucher'}
                        onClose={handleCloseDetails}
                        voucherID={voucherID}
                    />
                )
            }

            {//selectedBook
                isDetailVisible && (
                    <VoucherForm
                        keyForm={'detailVoucher'}
                        onClose={handleCloseDetails}
                        voucherID={voucherID}
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

export default ListProduct;