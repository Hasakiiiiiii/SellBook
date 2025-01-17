import React, { useEffect, useState } from 'react';
import styles from './HomeUser.module.css';
import { getAllBook } from '../../utils/API/ProductAPI';
import { Link, useNavigate } from 'react-router-dom';
import FooterUser from '../Component/FooterUser';
import HeaderUser from '../Component/HeaderUser';

const HomeUser = () => {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(null);
    const productsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy danh sách sản phẩm ban đầu khi trang được tải
        const fetchProducts = async () => {
            try {
                const data = await getAllBook();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            }
        };
        fetchProducts();
    }, []);

    // Hàm xử lý khi có kết quả tìm kiếm từ HeaderUser
    const handleSearchResults = (results) => {
        setSearchResults(results);
        setIsSearching(results.length > 0);
        setCurrentPage(1); // Quay về trang đầu khi có kết quả tìm kiếm mới
    };

    // Hàm chuyển hướng đến chi tiết sản phẩm
    const handleProductClick = (id) => {
        navigate(`/ProductDetail/${id}`);
    };

    // Lấy các sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = (isSearching ? searchResults : products || []).slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tính số trang dựa trên số lượng sản phẩm
    const totalPages = Math.ceil(((isSearching ? searchResults : products) || []).length / productsPerPage);

    return (
        <div className={styles.parent}>
            <HeaderUser user={user} logout={() => setUser(null)} onSearchResults={handleSearchResults} />

            <section className={styles.section}>
                {/* Hiển thị sản phẩm dựa trên kết quả tìm kiếm hoặc danh sách gốc */}
                {currentProducts.map((product, index) => (
                    <div
                        className={styles.productCard}
                        key={index}
                        onClick={() => handleProductClick(product.ma_san_pham)}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                className={styles.productImage}
                                src={product.anh_san_pham}
                                alt={product.ten_san_pham}
                            />
                        </div>
                        <div className={styles.productInfo}>
                            <p className={styles.productName}>{product.ten_san_pham}</p>
                            <p className={styles.productPrice}>{product.gia.toLocaleString()} VND</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Điều hướng phân trang */}
            {/* <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? styles.activePage : ""}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}

            <FooterUser />
        </div>
    );
};

export default HomeUser;
