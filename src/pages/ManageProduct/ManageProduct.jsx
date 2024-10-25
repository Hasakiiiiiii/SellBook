import React, { useEffect, useState } from "react";

import { getSanPhamByCuaHangId, searchProductsByCategoryID, searchSanPhamByName } from '../../utils/API/ProductAPI';
import { getCategory } from '../../utils/API/CategoryAPI';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./ManageProduct.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ListProduct from "../../utils/ManageListUI/ListProduct";
import BookForm from "../../utils/FormVisible/BookForm";

import { getCountBooksAll } from "../../utils/API/ProductAPI";

const ManageProduct = () => {

    // *Lấy số lượng sản phẩm
    const [productCount, setProductCount] = useState(0);
    // const [conHangCount, setConHangCount] = useState(0);
    // const [hetHangCount, setHetHangCount] = useState(0);
    // const [choDuyetCount, setChoDuyetCount] = useState(0);
    // const [biKhoaCount, setBiKhoaCount] = useState(0);

    // *Form xem chi tiết, thêm sách mới
    const [isAddBookVisible, setAddBookVisible] = useState(false);
    // *Lấy tất cả sản phẩm thuộc cửa hàng
    const [products, setProducts] = useState([]);
    // * Thể loại
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // * Search By Name
    const [searchName, setSearchName] = useState("");

    const handleVisibleForm = () => {
        setAddBookVisible(true);
    }

    const handleHiddenForm = () => {
        setAddBookVisible(false);
    }

    //* Tìm kiếm sản phẩm theo thể loại
    const handleSelectChange = (e) => {
        if (e.target.value >= 0) {
            searchProductsByCategoryID(Number(e.target.value))
                .then(data => {
                    setProducts(data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            getProductsAllByStoreID();
        }
    }

    // * Tìm kiếm sản phẩm theo tên
    const handleKeySearchByName = (e) => {
        setSearchName(e.target.value);
    }

    const handleSearchByName = () => {
        if (searchName !== null && searchName !== undefined && searchName !== "") {
            searchSanPhamByName(searchName)
                .then(data => {
                    setProducts(data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            getProductsAllByStoreID();
        }
    }

    // * Hàm lấy ra tất cả sản phẩm
    const getProductsAllByStoreID = () => {
        getSanPhamByCuaHangId()
            .then(data => {
                // console.log(data);
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const getBookBiKhoa = () => {
        let count = 0;
        if (products && products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                if (products[i]?.trangThaiHoatDong === 0) { // bị khóa
                    count++;
                }
            }
        }
        return count;
    };

    const getBookConHang = () => {
        let count = 0;
        if (products && products.length > 0) {
            for (let i = 0; i < productCount; i++) {
                if (products[i].trang_thai_int === 1) { // bị khóa
                    count++;
                }
            }
        }

        return count;
    };
    const getBookHetHang = () => {
        let count = 0;
        if (products && products.length > 0) {
            for (let i = 0; i < productCount; i++) {
                if (products[i].trang_thai_int === 2) { // bị khóa
                    count++;
                }
            }
        }

        return count;
    };
    // const getBookChoDuyet = () => {
    //     let count = 0;
    //     if (products && products.length > 0) {
    //         for (let i = 0; i < productCount; i++) {
    //             if (products[i].trang_thai_int === 3) { // bị khóa
    //                 count++;
    //             }
    //         }
    //     }
    //     return count;
    // };


    useEffect(() => {

        const fetchData = async () => {
            try {
                const productsAll = await getSanPhamByCuaHangId();
                setProducts(productsAll);

                const categoryData = await getCategory();
                setCategory(categoryData);

                const countBooks = await getCountBooksAll();
                setProductCount(countBooks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [])

    return (
        <div className="page scroll-container">
            <div className="container">
                {/* 4 nút đầu */}
                <div className="productbtn-list">
                    <button className="productbtn-item btn1" onClick={getSanPhamByCuaHangId()}>
                        <p>Tổng sản phẩm</p>
                        <h1>{productCount}</h1>
                    </button>
                    <button className="productbtn-item btn2">
                        <p>Sách bị khóa</p>
                        {/* <h1>{getBookBiKhoa()}</h1> */}
                    </button>
                    <button className="productbtn-item btn3">
                        <p>Sách chờ duyệt</p>
                        {/* <h1>{getBookChoDuyet()}</h1> */}
                    </button>
                    <button className="productbtn-item btn4">
                        <p>Sách còn hàng</p>
                        {/* <h1>{getBookConHang()}</h1> */}
                    </button>
                    <button className="productbtn-item btn5">
                        <p>Sách hết hàng</p>
                        {/* <h1>{getBookHetHang()}</h1> */}
                    </button>
                </div>
                {/* 3 thanh tìm kiếm */}
                <div className="product-search_list">
                    <div className="product-search_item">
                        <label>Thể loại sách</label>
                        <div className="product-search_item__flex">
                            <select
                                className="form-select"
                                aria-label="Danh sách danh mục sản phẩm"
                                onChange={handleSelectChange}
                            >
                                <option value={-1}>-- Tất cả --</option>
                                {category.map((cat, index) => (
                                    <option key={index} value={cat.ma_the_loai}>
                                        {cat.ten_the_loai}
                                    </option>
                                ))}
                            </select>
                            {/* <button>
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button> */}
                        </div>
                    </div>
                    {/* <div className="product-search_item">
                        <label>Tên tác giả</label>
                        <div className="product-search_item__flex">
                            <input type="text" class="form-control" />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div> */}
                    <div className="product-search_item">
                        <label>Tên sách</label>
                        <div
                            style={{ width: "350px" }}
                            className="product-search_item__flex"
                        >
                            <input
                                type="text"
                                class="form-control"
                                value={searchName}
                                onChange={handleKeySearchByName}
                            />
                            <button
                                className="product-search_item__btn"
                                onClick={handleSearchByName}
                            >
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleVisibleForm} className="product-search_btnadd">+ Thêm sản phẩm</button>
                    </div>
                </div>

                <ListProduct listBooks={products} keySearch={selectedCategory}></ListProduct>

                {/* Thông tin sách */}
                {
                    isAddBookVisible && (
                        <BookForm keyForm={'add-book'} onClose={handleHiddenForm} />
                    )
                }

            </div>
        </div>
    );
};

export default ManageProduct;
