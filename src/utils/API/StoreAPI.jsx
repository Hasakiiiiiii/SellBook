import axios from 'axios';
import storeID from '../../StoreId';

const hostCuaHang = "http://localhost:8080/api/v1/cuahang";


// * Hàm lấy thông tin cửa hàng theo ID
export const getCuaHangById = () => {
    return axios.get(`${hostCuaHang}/${storeID()}`)
        .then(response => {
            return response.data.result;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}