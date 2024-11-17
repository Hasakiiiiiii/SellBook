import React, { useState } from 'react';
import styles from '../Home/HomeUser.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderUser from '../Component/HeaderUser';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

import FooterUser from '../Component/FooterUser';
import './Register.css';

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        hoTen: '',
        email: '',
        matKhau: '',
        confirmMatKhau: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (userInfo.matKhau !== userInfo.confirmMatKhau) {
            setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/taikhoan/register', {
                ho_ten: userInfo.hoTen,
                email: userInfo.email,
                mat_khau: userInfo.matKhau
            });
            
            if (response.data.message === "Đăng ký tài khoản thành công") {
                alert("Đăng ký thành công!");
                navigate('/login'); // Chuyển hướng người dùng đến trang đăng nhập
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.parent}>
            <HeaderUser />
            <section>
                <div className="register-container">
                    <h2 className="register-title">Đăng ký</h2>
                    <form className="register-form" onSubmit={handleRegister}>
                        <input
                            type="text"
                            name="hoTen"
                            placeholder="Họ và tên"
                            className="register-input"
                            value={userInfo.hoTen}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="register-input"
                            value={userInfo.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="matKhau"
                            placeholder="Mật khẩu"
                            className="register-input"
                            value={userInfo.matKhau}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="confirmMatKhau"
                            placeholder="Nhập lại mật khẩu"
                            className="register-input"
                            value={userInfo.confirmMatKhau}
                            onChange={handleInputChange}
                        />

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <button type="submit" className="register-button">Đăng ký</button>
                    </form>
                    <div className="register-or">
                        <span>hoặc</span>
                    </div>
                    <div className="register-social">
                    <button className="social-button facebook-button">
                            <FaFacebook style={{ marginRight: '8px' }} /> {/* Icon Facebook */}
                            Facebook
                        </button>
                        <button
                            className="social-button google-button"
                            onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"}
                        >
                            <FaGoogle style={{ marginRight: '8px' }} /> {/* Icon Google */}
                            Đăng nhập bằng Google
                        </button>
                    </div>
                    <div className="register-login-link">
                        Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
                    </div>
                </div>
            </section>
            <FooterUser />
        </div>
    );
};

export default Register;
