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

import BookForm from '../FormVisible/BookForm';

const Book = {
    name: '',

};

const ListBestSelling = ({ listOrders, keySearch, status, statusHeader }) => {

    const orderId = '12'

    const [productCount, setProductCount] = useState(25);
    const [pagination, setPagination] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedValue, setSelectedValue] = useState(10); // số lượng sản phẩm hiển thị mỗi trang


    const indexOfLastItem = currentPage * selectedValue;
    const indexOfFirstItem = indexOfLastItem - selectedValue;
    // const currentItems = listBooks.slice(indexOfFirstItem, indexOfLastItem);

    const [selectedProduct, setSelectedProduct] = useState(''); // Trạng thái lưu thông tin sách đang xem
    const [isDetailVisible, setDetailVisible] = useState(false); // Trạng thái hiển thị chi tiết sách

    // * ẩn hiện form xem chi tiết
    const handleShowDetailProduct = (id) => {
        setDetailVisible(true);
        setSelectedProduct(id);
    }
    const handleCloseDetailProduct = () => {
        setDetailVisible(false);
    }


    //* click vào trang mấy
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('Selected value:', event.target.value); // In ra giá trị được chọn
    };

    //* const tableRows = currentItems.map((book, index) => ());
    const tableRows = Array.from({ length: selectedValue }).map((_, index) => (
        <tr key={index}>
            <td>
                <span className='stt'>{index + 1 + indexOfFirstItem}</span>
            </td>

            <td style={{ width: '120px', textAlign: 'center' }}>
                <img src="/images/sach.jpg" alt="book" />
            </td>
            {/* <td style={{ width: '150px', textAlign: 'center' }}>20232</td> */}
            <td style={{ width: '220px' }}>Người thầy tận tâm với nghề dạy học</td>
            <td style={{ width: '120px', textAlign: 'center' }}>120.000</td>
            <td style={{ width: '120px', textAlign: 'center' }}>1.274</td>
            <td style={{ width: '170px', textAlign: 'center' }}>152.880.000</td>
            <td style={{ width: '120px', textAlign: 'center' }}>1.390</td>
            <td style={{ width: '120px', textAlign: 'center' }}>4.8 / 5</td>
            <td style={{ width: '100px', textAlign: 'center' }}>
                <button type="button" onClick={() => handleShowDetailProduct('01')}>
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                </button>
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
                                <th style={{ width: '120px', textAlign: 'center' }}>Hình ảnh</th>
                                <th style={{ width: '220px' }}>Tên sách</th>
                                <th style={{ width: '120px', textAlign: 'center' }}>Giá</th>
                                <th style={{ width: '120px', textAlign: 'center' }}>Đã bán</th>
                                <th style={{ width: '170px', textAlign: 'center' }}>Doanh thu</th>
                                <th style={{ width: '120px', textAlign: 'center' }}>Kho</th>
                                {/* <th style={{ width: '100px', textAlign: 'center' }}>Đã bán</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Còn hàng</th> */}
                                <th style={{ width: '120px', textAlign: 'center' }}>Đánh giá</th>
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


            {
                isDetailVisible && (
                    <BookForm
                        keyForm='best-selling'
                        onClose={handleCloseDetailProduct} />
                )
            }
        </div>
    );
};

export default ListBestSelling;