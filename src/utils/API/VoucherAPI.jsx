import axios from 'axios';
import storeID from '../../StoreId';

const hostVoucher = "http://localhost:8080/api/v1/voucher";

// * Hàm lấy Voucher
export const getVouchersByCuaHangId = () => {
    return axios.get(`${hostVoucher}/cuahang-${storeID()}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}

// * Hàm lấy thông tin 1 Voucher
export const getVouchersByCuaHangIdAndVoucherID = (voucherID) => {
    return axios.get(`${hostVoucher}/cuahang-${storeID()}/${voucherID}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}

// * Hàm cập nhật voucher
export const updateVoucherByID = (voucherID, voucher) => {
    return axios.put(`${hostVoucher}/cuahang-${storeID()}/${voucherID}`, voucher)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật voucher:', error);
            throw error;
        });
};

// * Hàm thêm voucher mới
export const addVoucher = (voucher) => {
    return axios.post(`${hostVoucher}/cuahang-${storeID()}`, voucher)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Lỗi khi thêm voucher mới:', error);
            throw error;
        });
};