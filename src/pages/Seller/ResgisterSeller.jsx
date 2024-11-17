import React, { useState } from 'react';
import './RegisterSeller.css';
import HeaderUser from '../Component/HeaderUser';
import FooterUser from '../Component/FooterUser';

const RegisterSeller = () => {
    const [shopName, setShopName] = useState('');
    const [pickupAddress, setPickupAddress] = useState({
        name: 'Lê Châu Kiệt',
        phone: '0399787888',
        address: '222, Xã Hiếu Liêm, Huyện Bắc Tân Uyên, Bình Dương',
    });
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const handleEditAddress = () => {
        setIsEditingAddress(true);
    };

    const handleCancelEdit = () => {
        setIsEditingAddress(false);
    };

    const handleCompleteEdit = () => {
        setIsEditingAddress(false);
        // Logic to save address
    };

    return (
        <div>
            <HeaderUser />
            <div className="register-seller-container">
                <h2 className="register-seller-title">Đăng ký trở thành Người bán</h2>
                <div className="shop-info">
                    <h3>Thông tin Shop</h3>
                    <div className="form-group">
                        <label>Tên shop</label>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            placeholder="Nhập tên shop của bạn"
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ lấy hàng</label>
                        <p>
                            {pickupAddress.name} | {pickupAddress.phone}<br />
                            {pickupAddress.address}
                        </p>
                        <button className="edit-button" onClick={handleEditAddress}>Chỉnh sửa</button>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            value={phone}   
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button className="register-button">Đăng ký</button>
                </div>
            </div>

            {isEditingAddress && (
                <div className="overlay">
                    <div className="edit-address-form">
                        <h4>Địa chỉ lấy hàng</h4>
                        <input type="text" placeholder="Họ và tên" className="input-field" />
                        <input type="text" placeholder="Số điện thoại" className="input-field" />
                        <select className="input-field">
                            <option>Tỉnh/Thành phố</option>
                        </select>
                        <select className="input-field">
                            <option>Quận/Huyện</option>
                        </select>
                        <select className="input-field">
                            <option>Phường/Xã</option>
                        </select>
                        <textarea placeholder="Địa chỉ cụ thể" className="input-field" rows="3"></textarea>
                        <div className="form-buttons">
                            <button style={{fontSize: '16px'}} className="cancel-button" onClick={handleCancelEdit}>Hủy</button>
                            <button style={{fontSize: '16px'}} className="complete-button" onClick={handleCompleteEdit}>Hoàn thành</button>
                        </div>
                    </div>
                </div>                                                                                                 
            )}

            <FooterUser />
        </div>
    );
};

export default RegisterSeller;
