import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookByID, getAllBook } from '../../utils/API/ProductAPI';
import HeaderUser from '../Component/HeaderUser';
import FooterUser from '../Component/FooterUser';
import styles from './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getBookByID(id);
                setProduct(data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllBook();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const randomSelectedProducts = getRandomProducts(products, 4);
            setRandomProducts(randomSelectedProducts);
        }
    }, [products]);

    const getRandomProducts = (arr, num) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const handleProductClick = (id) => {
        navigate(`/ProductDetail/${id}`);
        window.scrollTo(0, 0);
    };

    const addToCart = () => {
        const user = JSON.parse(sessionStorage.getItem('user')); // Lấy thông tin người dùng từ session
        if (!user) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
            navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            return;
        }

        const cartKey = `cart_${user.id_tai_khoan}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProduct = cart.find(item => item.ma_san_pham === product.ma_san_pham);
        
        if (existingProduct) {
            existingProduct.so_luong += quantity;
        } else {
            cart.push({ ...product, so_luong: quantity });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng");
    };
    const buyNow = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            alert("Vui lòng đăng nhập để mua sản phẩm");
            navigate("/login");
            return;
        }

        // Lưu sản phẩm hiện tại vào sessionStorage để chỉ chuyển một sản phẩm
        sessionStorage.setItem('checkoutItem', JSON.stringify({ ...product, so_luong: quantity }));
        
        // Điều hướng đến trang checkout
        navigate("/checkout");
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.parent}>
            <HeaderUser />

            <section className="product-detail">
                <div className="product-main-info">
                    <img src={product.anh_san_pham} alt={product.ten_san_pham} className="product-imageCart" />
                    <div className="product-info">
                        <h1>{product.ten_san_pham}</h1>
                        <p className="product-author">{product.tac_gia}</p>
                        <p className="product-price">{product.gia.toLocaleString()} đ</p>
                        <p className="product-status">Tình trạng: Còn hàng</p>
                        <p className="product-category">Danh mục: Tiểu thuyết</p>
                        <div className="quantity-control">
                            <label>Số lượng:</label>
                            <input
                                type="number"
                                value={quantity}
                                min="1"
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="quantity-input"
                            />
                        </div>
                        <div className="action-buttons">
                            <button className="add-to-cart-btn" onClick={addToCart}>THÊM VÀO GIỎ HÀNG</button>
                            <button onClick={buyNow} className="buy-now-btn">MUA NGAY</button>
                        </div>
                        <p className="contact-info">Gọi đặt hàng: (028) 3820 7153 hoặc 0933 109 009</p>
                        <p className="shipping-info">
                            Đổi trả hàng trong vòng 7 ngày <br />
                            Freeship nội thành Sài Gòn từ 150.000đ <br />
                            Freeship toàn quốc từ 250.000đ
                        </p>
                    </div>
                </div>

                <div className="product-details-section">
                    <h3>THÔNG TIN CHI TIẾT</h3>
                    <table className="product-details-table">
                        <tbody>
                            <tr><td>Nhà xuất bản:</td><td>NXB Văn Học</td></tr>
                            <tr><td>Ngày xuất bản:</td><td>{product.ngay_xuat_ban}</td></tr>
                            <tr><td>Nhà phát hành:</td><td>Đông A</td></tr>
                            <tr><td>Kích thước:</td><td>13.5 x 20.5 x 2.5 cm</td></tr>
                            <tr><td>Số trang:</td><td>{product.so_trang}</td></tr>
                            <tr><td>Trọng lượng:</td><td>700 gram</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="shop-info">
                    <p className="shop-name">Tên shop</p>
                    <p className="shop-join-date">Tham gia: 01/01/2024</p>
                </div>

                <div className="product-description">
                    <h3>Giới thiệu sản phẩm</h3>
                    <p>{product.mo_ta}</p>
                </div>
                <div className="product-reviews">
                    <h3>ĐÁNH GIÁ SẢN PHẨM</h3>
                    <div className="review">
                        <p className="review-user">Lê Châu Kiệt <span className="review-time">1 phút trước</span></p>
                        <p className="review-content">Sản phẩm tốt</p>
                        <div className="review-actions">
                            <span>Thích</span> · <span>Phản hồi</span>
                        </div>
                    </div>
                </div>

                <div className="related-products">
                    <h3>SẢN PHẨM CÙNG LOẠI</h3>
                    <div className="related-products-carousel">
                        {randomProducts.map((relatedProduct) => (
                            <div
                                key={relatedProduct.ma_san_pham}
                                className="related-product-card"
                                onClick={() => handleProductClick(relatedProduct.ma_san_pham)}
                            >
                                <div className="product-image-placeholder">
                                    <img
                                        src={relatedProduct.anh_san_pham}
                                        alt={relatedProduct.ten_san_pham}
                                        className="product-image"
                                    />
                                </div>
                                <p className="related-product-name">{relatedProduct.ten_san_pham}</p>
                                <p className="related-product-price">{relatedProduct.gia.toLocaleString()} đ</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterUser />
        </div>
    );
};

export default ProductDetail;
