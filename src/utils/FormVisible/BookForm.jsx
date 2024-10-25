import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./FormVisibleAll.css";

import NotificationUI from '../Notification/NotificationUI';

import storeID from '../../StoreId';
import { getSanPhamById, updateSanPham, addSanPham, deleteBook } from '../../utils/API/ProductAPI';
import { getCategory, getCategoryByID } from '../../utils/API/CategoryAPI';

const BookForm = ({ keyForm, onClose, onApply, bookID, statusText, statusInt }) => {

    // * Thông tin sách
    const [book, setBook] = useState({})
    // * Hình ảnh được chọn
    const [selectedImage, setSelectedImage] = useState(null);
    // * Thể loại
    const [category, setCategory] = useState([]);
    const [categoryUpdate, setCategoryUpdate] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    // *Check form
    const [errors, setErrors] = useState({});

    // * Hiển thị thông báo
    const [notificationStatus, setNotificationStatus] = useState('');
    const [closeNotification, setCloseNotification] = useState(true);

    // * Reload
    const [load, setLoad] = useState(false);

    // *Hàm close notification
    const handleCloseNotification = () => {
        setCloseNotification(false);
        setNotificationStatus('')
    }

    //* Hàm xử lý khi người dùng chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && keyForm === 'add-book') {
            setSelectedImage(URL.createObjectURL(file)); // Tạo URL tạm thời cho ảnh
            setBook(prevBook => ({
                ...prevBook,
                ma_cua_hang: storeID(),
                trang_thai_duyet: false,
                trang_thai_khoa: false,
                anh_san_pham: file.name // Giả sử bạn chỉ cần lưu tên ảnh
            }));
        }
        if (keyForm === 'detail-book') {
            setSelectedImage(URL.createObjectURL(file)); // Tạo URL tạm thời cho ảnh
            setBook(prevBook => ({
                ...prevBook,
                anh_san_pham: file.name // Giả sử bạn chỉ cần lưu tên ảnh
            }));
        }
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const tempUrl = URL.createObjectURL(file);  // Tạo URL tạm thời cho ảnh
    //         setSelectedImage(tempUrl);  // Cập nhật ảnh để hiển thị
    //         setBook(prevBook => ({
    //             ...prevBook,
    //             anhSanPham: tempUrl  // Giả sử bạn đa    ng xử lý URL tạm thời
    //         }));
    //     }
    // };

    const handleInputChange = (e) => {
        const { id, value } = e.target; // Lấy id và giá trị của input

        let newValue = value;

        if (id === 'gia' || id === 'so_trang' || id === 'so_luong_hang') {
            newValue = value.replace(/[^0-9]/g, '');
        }

        if (keyForm === 'add-book') {
            setBook(prevBook => ({
                ...prevBook, // giữ nguyên các giá trị khác của book
                ma_cua_hang: storeID(),
                trang_thai_duyet: false,
                trang_thai_khoa: false,
                [id]: newValue  // cập nhật giá trị cho trường có id tương ứng
            }));
        }
        if (keyForm === 'detail-book') {
            setBook(prevBook => ({
                ...prevBook,
                [id]: newValue  // cập nhật giá trị cho trường có id tương ứng
            }));
        }

    };

    // * Bấm nút tạo mới
    const handleSubmitAdd = (e) => {
        // e.preventDefault();

        const newErrors = {};

        // Kiểm tra các trường dữ liệu
        if (!book.anh_san_pham) {
            newErrors.anh_san_pham = true;
        }
        if (!book.ten_san_pham) {
            newErrors.ten_san_pham = true;
        }
        if (!book.gia) {
            newErrors.gia = true;
        }
        if (!book.so_trang) {
            newErrors.so_trang = true;
        }
        if (!book.ngay_xuat_ban) {
            newErrors.ngay_xuat_ban = true;
        }
        if (!book.tac_gia) {
            newErrors.tac_gia = true;
        }
        if (!book.phien_ban) {
            newErrors.phien_ban = true;
        }
        if (!book.mo_ta) {
            newErrors.mo_ta = true;
        }
        if (!book.so_luong_hang) {
            newErrors.so_luong_hang = true;
        }
        if (!book.the_loai || !book.the_loai.ma_the_loai) {
            newErrors.the_loai = true;
        }

        // Nếu có lỗi, cập nhật trạng thái errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            handleAddBook(book)
        }
    };

    const handleSubmitUpdate = (e) => {
        // e.preventDefault();

        const newErrors = {};

        // Kiểm tra các trường dữ liệu
        if (!book.anh_san_pham) {
            newErrors.anh_san_pham = true;
        }
        if (!book.ten_san_pham) {
            newErrors.ten_san_pham = true;
        }
        if (!book.gia) {
            newErrors.gia = true;
        }
        if (!book.so_trang) {
            newErrors.so_trang = true;
        }
        if (!book.ngay_xuat_ban) {
            newErrors.ngay_xuat_ban = true;
        }
        if (!book.tac_gia) {
            newErrors.tac_gia = true;
        }
        if (!book.phien_ban) {
            newErrors.phien_ban = true;
        }
        if (!book.mo_ta) {
            newErrors.mo_ta = true;
        }
        if (!book.so_luong_hang) {
            newErrors.so_luong_hang = true;
        }
        if (!book.the_loai || !book.the_loai.ma_the_loai) {
            newErrors.the_loai = true;
        }

        // Nếu có lỗi, cập nhật trạng thái errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            handleUpdateBook(book)
        }
    };

    // * Hàm check khi ng dùng click vào mà ko nhập dữ liệu
    const handleInputBlur = (e) => {
        const { id, value } = e.target;

        // Kiểm tra nếu giá trị bị bỏ trống
        setErrors(prevErrors => ({
            ...prevErrors,
            [id]: value === ''  // true nếu không có dữ liệu
        }));
    };


    //* Hàm xử lý khi chọn thể loại
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;

        // Nếu người dùng không chọn thể loại hợp lệ (""), thì không cập nhật book
        if (selectedValue && keyForm === 'add-book') {
            getCategoryByID(selectedValue)
                .then(data => {
                    setBook(prevBook => ({
                        ...prevBook,
                        ma_cua_hang: storeID(),
                        trang_thai_duyet: false,
                        trang_thai_khoa: false,
                        the_loai: data  // Cập nhật đối tượng thể loại trong book
                    }));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    throw error;
                });
        }

        if (selectedValue && keyForm === 'detail-book') {
            getCategoryByID(selectedValue)
                .then(data => {
                    setBook(prevBook => ({
                        ...prevBook,
                        the_loai: data  // Cập nhật đối tượng thể loại trong book
                    }));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    throw error;
                });
        }
    };

    // * Hàm thêm sản phẩm mới
    const handleAddBook = (book) => {
        // Thêm sản phẩm vào cửa hàng
        addSanPham(book)
            // Thành công
            .then(data => {
                // Thông báo thêm sản phẩm thành công
                // setNotificationStatus('addIsSuccess');
                // Xóa form
                setBook(data);
                setNotificationStatus('addBookIsSuccess');
                window.location.reload();
            })
            // Thất bại
            .catch(error => {
                setNotificationStatus('addBookIsFail');
                console.error('Error adding data:', error);
            });
    };


    // * Hàm update sản phẩmm
    const handleUpdateBook = (book) => {
        updateSanPham(bookID, book)
            .then(data => {
                // setBookUpdate(data);
                // alert('Cập nhật sản phẩm thành công!');
                // setBook(data);
                setNotificationStatus('updateIsSuccess');
                setLoad(true);
            })
            .catch(error => {
                setNotificationStatus('updateIsFail');
                console.error('Error updating data:', error);
            });
    };

    const handleDelete = (book) => {
        deleteBook(book)
            .then(data => {
                setNotificationStatus('deleteIsSuccess');
                setLoad(true);
            })
            .catch(error => {
                setNotificationStatus('deleteIsFail');
                console.error('Error deleting data:', error);
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách category
                const categoryData = await getCategory();
                setCategory(categoryData);

                // Lấy thông tin sản phẩm theo ID
                const data = await getSanPhamById(bookID);
                setBook(data);

                console.log('Sản phẩm:', data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();  // Thực thi hàm fetchData

    }, [bookID]);


    const handleGetTrangThai = (trangThaiInt) => {
        if (trangThaiInt === 0) {
            return 'khoa';
        } else if (trangThaiInt === 1) {
            return 'conhang';
        } else if (trangThaiInt === 2) {
            return 'hethang';
        } else {
            return 'dangyeucau'
        }
    }

    // * Hàm đóng xem chi tiết
    const handleIconClick = () => {
        if (load) {
            window.location.reload();
        } else {
            onClose();
        }
    };

    return (
        <div>
            <div className="bg_black">
                <div className="addnewbook">
                    <div className="addnewbook-header">
                        {keyForm === 'add-book' && (
                            <h3>Thêm sách mới</h3>
                        )}
                        {/* xem chi tiết sản phẩm */}
                        {keyForm === 'detail-book' && (
                            <>
                                <div>
                                    <h3>{book.ten_san_pham}</h3>
                                    <span className={handleGetTrangThai(statusInt)}>{statusText}</span>
                                </div>
                            </>
                        )}
                        {/* Sách bán chạy */}
                        {keyForm === 'best-selling' && (
                            <div>
                                <h3>{book.ten_san_pham}</h3>
                            </div>
                        )}

                        <FontAwesomeIcon onClick={handleIconClick} style={{ cursor: 'pointer' }} className="faXmark" icon={faXmark}></FontAwesomeIcon>
                    </div>
                    {/* form điền thông tin sách */}
                    <div className="addnewbook-form">
                        <div className="addnewbook-form_img">
                            <img src={selectedImage || `/images/${book.anh_san_pham}`} />
                            {keyForm === 'add-book' && (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*" // Chỉ cho phép chọn các tập tin ảnh
                                        onChange={handleImageChange} // Xử lý khi chọn ảnh
                                        id="fileInput"
                                        style={{ cursor: 'pointer', display: 'none' }} // Đổi con trỏ thành kiểu click
                                    />
                                    <label htmlFor="fileInput" className="custom-file-input">
                                        + Chọn ảnh
                                    </label>
                                    {/* Có thể tùy chỉnh thêm CSS để hiển thị khác */}
                                    {selectedImage === null ? <span>Ảnh không được để trống!</span> : ''}
                                </div>
                            )}
                            {keyForm === 'detail-book' && statusInt !== 0 && (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        id="fileInput"
                                        style={{ cursor: 'pointer', display: 'none' }} // Đổi con trỏ thành kiểu click
                                    />
                                    <label htmlFor="fileInput" className="custom-file-input">
                                        + Thay ảnh
                                    </label>
                                    {/* Có thể tùy chỉnh thêm CSS để hiển thị khác */}
                                </div>
                            )}


                        </div>

                        <div className="addnewbook-form_info">
                            <div>
                                <label htmlFor="ten_san_pham">Tên sách</label>
                                <input
                                    className={errors.ten_san_pham ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="ten_san_pham"
                                    type="text"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.ten_san_pham}
                                    disabled={statusInt === 0}
                                />
                                {/* Hiển thị thông báo lỗi nếu có lỗi */}
                                {errors.ten_san_pham && <span>Thông tin không hợp lệ!</span>}
                            </div>
                            <div>
                                <label for="name">Tác giả</label>
                                <input
                                    className={errors.tac_gia ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="tac_gia" type="text"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.tac_gia}
                                    disabled={statusInt === 0}
                                />
                                {errors.tac_gia && <span>Thông tin không hợp lệ!</span>}
                            </div>
                            <div>
                                <label for="name">Thể loại</label>
                                {/* <input className={errors.ten_san_pham ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'} id="name" type="text" onChange={handleInputChange} onBlur={handleInputBlur} value={book.theLoai ? book.theLoai.tenTheLoai : 'Không có thể loại'} /> */}
                                <select
                                    id="the_loai"
                                    className={`form-select btnCheckBorder-default ${errors.the_loai ? 'btnCheckBorder-fail' : ''}`}
                                    aria-label="Danh sách danh mục sản phẩm"
                                    onChange={handleSelectChange}
                                    onBlur={handleInputBlur}
                                    value={book.the_loai?.ma_the_loai || ''}
                                    disabled={statusInt === 0}
                                >
                                    <option value="">Chọn thể loại</option>  {/* Tùy chọn mặc định */}
                                    {category.map((cat, index) => (
                                        <option key={index} value={cat.ma_the_loai}>
                                            {cat.ten_the_loai}
                                        </option>
                                    ))}
                                </select>
                                {errors.the_loai && <span>Vui lòng chọn thể loại hợp lệ!</span>}
                            </div>
                            <div>
                                <label for="name">Mã ISBN
                                    {keyForm === 'add-book' && (
                                        <span style={{ color: 'gray', top: '2px', right: '103px' }}>( không bắt buộc )</span>
                                    )}

                                </label>
                                <input
                                    className='btnCheckBorder-default'
                                    id="ma_isbn"
                                    type="text"
                                    onChange={handleInputChange}
                                    value={book.ma_isbn}
                                    disabled={statusInt === 0}
                                />
                            </div>
                            <div>
                                <label for="name">Số lượng sách bán ra</label>
                                <input
                                    className={errors.so_luong_hang ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="so_luong_hang"
                                    type="text"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.so_luong_hang}
                                    disabled={statusInt === 0}
                                />
                                {errors.so_luong_hang && <span>Thông tin không hợp lệ!</span>}
                            </div>
                        </div>
                        <div className="addnewbook-form_info">
                            <div>
                                <label for="name">Năm xuất bản
                                </label>
                                <input
                                    className={errors.ngay_xuat_ban ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="ngay_xuat_ban"
                                    type="date"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.ngay_xuat_ban}
                                    disabled={statusInt === 0}
                                />
                                {errors.ngay_xuat_ban && <span>Thông tin không hợp lệ!</span>}
                            </div>
                            <div>
                                <label for="name">Số trang</label>
                                <input
                                    className={errors.so_trang ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="so_trang"
                                    type="text"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.so_trang}
                                    disabled={statusInt === 0}
                                />
                                {errors.so_trang && <span>Thông tin không hợp lệ!</span>}
                            </div>
                            <div>
                                <label for="name">Giá</label>
                                <input
                                    className={errors.gia ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="gia"
                                    type="text"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.gia}
                                    disabled={statusInt === 0}
                                />
                                {errors.gia && <span>Thông tin không hợp lệ!</span>}
                            </div>
                            <div>
                                <label for="name">Ngôn ngữ</label>
                                <input
                                    className='btnCheckBorder-default'
                                    id="ngon_ngu"
                                    type="text"
                                    value={'Tiếng việt'}
                                    disabled />
                            </div>
                            <div>
                                <label for="name">Phiên bản</label>
                                <input
                                    className={errors.phien_ban ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="phien_ban"
                                    type="text"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.phien_ban}
                                    disabled={statusInt === 0}
                                />
                                {errors.phien_ban && <span>Thông tin không hợp lệ!</span>}
                            </div>
                        </div>
                        {/* <div className="addnewbook-form_longinp1">
                            <div>
                                <label for="name">Hình thức
                                    {keyForm === 'add-book' && keyForm === 'detail-book' && (
                                        <span>( thông tin này nhằm mô tả chi tiết sản phẩm của bạn )</span>
                                    )}

                                </label>
                                <input className={errors.ten_san_pham ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'} id="name" type="text" placeholder="VD: chất liệu của sách, kích thước, độ dày trang sách,v.v..." />
                            </div>
                        </div> */}
                        <div className="addnewbook-form_longinp2">
                            <div>
                                <label for="name">Tóm tắt nội dung sách
                                    {keyForm === 'add-book' && keyForm === 'detail-book' && (
                                        <span>( thông tin này nhằm mô tả chi tiết sản phẩm của bạn )</span>
                                    )}

                                </label>
                                <textarea
                                    className={errors.mo_ta ? 'btnCheckBorder-fail' : 'btnCheckBorder-default'}
                                    id="mo_ta"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={book.mo_ta}
                                    type="text"
                                    disabled={statusInt === 0}
                                    placeholder="VD: tóm tắt ngắn gọn nội dung, gây tò mò cho người mua..." />

                                {errors.mo_ta && <span style={{ display: 'block', color: 'red', fontSize: '1.2rem' }}>Thông tin không hợp lệ!</span>}
                            </div>
                        </div>

                        {/* bấm vào nút thêm sản phẩm */}
                        {keyForm === 'add-book' && (
                            <div className="addnewbook-form_btn">
                                <button onClick={onClose}>Hủy</button>
                                <button onClick={handleSubmitAdd}>Tạo sản phẩm</button>
                            </div>
                        )}
                        {/* xem chi tiết sản phẩm */}
                        {keyForm === 'detail-book' && statusInt === 0 && (
                            <div className="addnewbook-form_btn">
                                <button>Xóa Sản Phẩm</button>
                                <button>Gửi Yêu Cầu Hủy Khóa</button>
                            </div>
                        )}
                        {keyForm === 'detail-book' && (statusInt === 1 || statusInt === 2) && (
                            <div className="addnewbook-form_btn">
                                <button>Xóa Sản Phẩm</button>
                                <button onClick={handleSubmitUpdate}>Cập Nhật</button>
                            </div>
                        )}
                        {keyForm === 'detail-book' && statusInt === 3 && (
                            <div className="addnewbook-form_btn">
                                <button>Xóa Sản Phẩm</button>
                                <button onClick={handleSubmitUpdate}>Cập Nhật</button>
                            </div>
                        )}

                        {keyForm === 'add-book' && keyForm === 'detail-book' && (
                            <div className="addnewbook-form_note">
                                <p>Lưu ý: Sản phẩm mới cần qua kiểm duyệt của quản lý (1 - 2 ngày)
                                    trước khi đăng bán để đảm bảo chất lượng.</p>
                                <p>Xin cảm ơn sự thông cảm và hợp tác của bạn!</p>
                            </div>
                        )}



                    </div>
                </div>
                {notificationStatus === 'updateIsSuccess' && closeNotification === true && (
                    <div>
                        <NotificationUI
                            type="success"
                            title="Cập nhật"
                            description={`"Cập nhật sách thành công."`}
                            onClose={handleCloseNotification}
                            keyPage={"bookForm"}
                        />
                    </div>
                )}
                {notificationStatus === 'updateIsFail' && closeNotification === true && (
                    <div>
                        <NotificationUI
                            type="error"
                            title="Cập nhật"
                            description={`"Cập nhật sách thất bại."`}
                            onClose={handleCloseNotification}
                            keyPage={"bookForm"}
                        />
                    </div>
                )}
                {notificationStatus === 'addBookIsSuccess' && closeNotification === true && (
                    <div>
                        <NotificationUI
                            type="success"
                            title="Thêm sách"
                            description={`"Tạo sách mới thành công."`}
                            onClose={handleCloseNotification}
                            keyPage={"bookForm"}
                        />
                    </div>
                )}
                {notificationStatus === 'addBookIsFail' && closeNotification === true && (
                    <div>
                        <NotificationUI
                            type="error"
                            title="Thêm sách"
                            description={`"Tạo sách mới thất bại."`}
                            onClose={handleCloseNotification}
                            keyPage={"bookForm"}
                        />
                    </div>
                )}
                {notificationStatus === 'deleteIsSuccess' && closeNotification === true && (
                    <div>
                        <NotificationUI
                            type="success"
                            title="Xóa sách"
                            description={`"Xóa sách thành công."`}
                            onClose={handleCloseNotification}
                            keyPage={"bookForm"}
                        />
                    </div>
                )}
                {notificationStatus === 'deleteIsFail' && closeNotification === true && (
                    <div>
                        <NotificationUI
                            type="error"
                            title="Xóa sách"
                            description={`"Xóa sách thất bại."`}
                            onClose={handleCloseNotification}
                            keyPage={"bookForm"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookForm;