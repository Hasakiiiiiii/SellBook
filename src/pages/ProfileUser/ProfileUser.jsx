import React, { useEffect, useState } from 'react';
import HeaderUser from '../Component/HeaderUser';
import FooterUser from '../Component/FooterUser';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfileUser.css';

const ProfileUser = () => {
    const [userData, setUserData] = useState({
        id_tai_khoan: '',    // ID tài khoản
        ten_dang_nhap: '',   // Tên đăng nhập
        ho_ten: '',          // Họ và tên
        email: '',           // Email (chỉ đọc)
        so_dt: '',           // Số điện thoại
        ngay_sinh: '',       // Ngày sinh
        gioi_tinh: '',       // Giới tính
    });
    const [selectedImage, setSelectedImage] = useState(null);

    // Hàm lấy dữ liệu người dùng từ API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id_tai_khoan = sessionStorage.getItem('id_tai_khoan'); // Lấy ID tài khoản từ session storage
                const response = await axios.get(`http://localhost:8080/api/taikhoan/profile/${id_tai_khoan}`);
                setUserData(response.data.result); // Lưu dữ liệu người dùng vào state
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };
        fetchUserData();
    }, []);

    // Hàm xử lý thay đổi dữ liệu trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // Hàm xử lý thay đổi ảnh đại diện
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // Hàm xử lý cập nhật hồ sơ
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const id_tai_khoan = sessionStorage.getItem('id_tai_khoan'); // Lấy ID tài khoản từ session storage
            await axios.put(`http://localhost:8080/api/taikhoan/profile/${id_tai_khoan}`, userData);
            alert("Cập nhật hồ sơ thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            alert("Đã xảy ra lỗi khi cập nhật hồ sơ.");
        }
    };

    return (
        <div className="profile-page">
            {/* Sử dụng HeaderUser */}
            <HeaderUser />

            <section className="profile-section">
                <div className="profile-container">
                    <div className="profile-sidebar">
                        <h3>Tài khoản của tôi</h3>
                        <ul>
                            <li><Link to="/address" className="sidebar-link">Địa chỉ</Link></li>
                            <li><Link to="/change-pass" className="sidebar-link">Đổi mật khẩu</Link></li>
                            <li><Link to="/shopping" className="sidebar-link">Đơn mua</Link></li>
                        </ul>
                    </div>
                    <div className="profile-content">
                        <h2 className="profile-title">Hồ sơ của tôi</h2>
                        <p className="profile-subtitle">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        <form className="profile-form" onSubmit={handleSaveProfile}>
                            <div className="profile-form-group">
                                <label>Tên đăng nhập</label>
                                <input
                                    type="text"
                                    name="ten_dang_nhap"
                                    value={userData.ten_dang_nhap}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="ho_ten"
                                    value={userData.ho_ten}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    readOnly
                                    className="profile-input"
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="so_dt"
                                    value={userData.so_dt}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                            <div className="profile-form-group">
                                <label>Giới tính</label>
                                <div className="profile-gender-options">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gioi_tinh"
                                            value="male"
                                            checked={userData.gioi_tinh === 'male'}
                                            onChange={handleInputChange}
                                        /> Nam
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gioi_tinh"
                                            value="female"
                                            checked={userData.gioi_tinh === 'female'}
                                            onChange={handleInputChange}
                                        /> Nữ
                                    </label>
                                </div>
                            </div>
                            <div className="profile-form-group">
                                <label>Ngày sinh</label>
                                <input
                                    type="date"
                                    name="ngay_sinh"
                                    value={userData.ngay_sinh}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            </div>
                            <button type="submit" className="save-button">Lưu</button>
                        </form>
                    </div>
                </div>
                        <div className="profile-image-section">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Ảnh đại diện" className="profile-image-placeholder" />
                            ) : (
                                <div className="profile-image-placeholder"></div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="choose-image-input"
                                id="fileInput"
                            />
                            <p className="image-info">Dung lượng file tối đa 1 MB<br />Định dạng JPEG, PNG</p>
                        </div>
            </section>

            <FooterUser />
        </div>
    );
};

export default ProfileUser;
