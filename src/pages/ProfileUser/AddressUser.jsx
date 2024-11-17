import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddressUser.css';
import HeaderUser from '../Component/HeaderUser';

const AddressUser = () => {
    const [addresses, setAddresses] = useState([]);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    // Fetch the addresses on component mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (user) {
                    const response = await axios.get(`http://localhost:8080/api/v1/nguoidung/diachi/${user.id_tai_khoan}`);
                    setAddresses(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách địa chỉ:", error);
            }
        };

        fetchAddresses();
    }, []);

    const handleAddNewAddress = () => {
        setShowAddAddressForm(true);
        setAddresses('')
        setName('');
        setCity('')
        setDistrict('')
        setPhone('')

    };

    const handleBack = () => {
        setShowAddAddressForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const newAddress = {
                ten_dia_chi: `${specificAddress}, ${ward}, ${district}, ${city}`,
                dia_chi_mac_dinh: isDefault ? 1 : 0,
                tai_khoan: { id_tai_khoan: user.id_tai_khoan }
            };

            const response = await axios.post(`http://localhost:8080/api/v1/nguoidung/diachi/nguoidung-${user.id_tai_khoan}`, newAddress);
            console.log("Địa chỉ đã được thêm thành công:", response.data);

            setAddresses([...addresses, response.data]); // Cập nhật danh sách địa chỉ
            setShowAddAddressForm(false); // Đóng form thêm địa chỉ
        } catch (error) {
            console.error("Lỗi khi thêm địa chỉ:", error);
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            await axios.delete(`http://localhost:8080/api/v1/nguoidung/${user.id_tai_khoan}/diachi-${addressId}`);
            setAddresses(addresses.filter(address => address.ma_dia_chi !== addressId));
        } catch (error) {
            console.error("Lỗi khi xóa địa chỉ:", error);
        }
    };

    return (
        <div>
            <HeaderUser />
            <div className="address-page">
                {showAddAddressForm ? (
                    <div className="new-address-form">
                        <h2>Địa chỉ mới</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Họ và tên" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="Số điện thoại" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <select className="input-field" value={city} onChange={(e) => setCity(e.target.value)}>
                                <option>Tỉnh/Thành phố</option>
                                <option>Hà Nội</option>
                                <option>TP. Hồ Chí Minh</option>
                                {/* Thêm các tỉnh/thành phố khác */}
                            </select>
                            <select className="input-field" value={district} onChange={(e) => setDistrict(e.target.value)}>
                                <option>Quận/Huyện</option>
                                <option>Quận 1</option>
                                <option>Quận 2</option>
                                {/* Thêm các quận/huyện */}
                            </select>
                            <select className="input-field" value={ward} onChange={(e) => setWard(e.target.value)}>
                                <option>Phường/Xã</option>
                                <option>Phường 1</option>
                                <option>Phường 2</option>
                                {/* Thêm các phường/xã */}
                            </select>
                            <textarea placeholder="Địa chỉ cụ thể" className="input-field" rows="3" value={specificAddress} onChange={(e) => setSpecificAddress(e.target.value)}></textarea>
                            <label className="default-checkbox">
                                <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} /> Đặt làm địa chỉ mặc định
                            </label>
                            <div className="form-buttons">
                                <button type="button" className="back-button" onClick={handleBack}>Trở về</button>
                                <button type="submit" className="submit-button">Hoàn thành</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="address-list">
                        <div className="address-header">
                            <h2>Địa chỉ của tôi</h2>
                            <button className="add-address-button" onClick={handleAddNewAddress}>+ Thêm địa chỉ mới</button>
                        </div>
                        {addresses.map((address) => (
                            <div key={address.ma_dia_chi} className="address-item">
                                <p><strong>{name}</strong> (+84) {phone}</p>
                                <p>{address.ten_dia_chi}</p>
                                {address.dia_chi_mac_dinh ? <button className="default-button">Mặc định</button> : null}
                                <div className="address-actions">
                                    <span className="update-action">Cập nhật</span>
                                    <span className="delete-action" onClick={() => handleDeleteAddress(address.ma_dia_chi)}>Xoá</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressUser;
