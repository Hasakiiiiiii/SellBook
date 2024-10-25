import axios from 'axios';
import storeID from '../../StoreId';

const hostProduct = "http://localhost:8080/api/v1/product";




//* Hàm lấy danh sách sản phẩm theo cửa hàng - http://localhost:8080/api/v1/product/cuahang-(storeID)
export const getSanPhamByCuaHangId = () => {
    return axios.get(`${hostProduct}/cuahang-${storeID()}`)
        .then(response => {
            if (Array.isArray(response.data))
                return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
};

//* Hàm lấy chi tiết sản phẩm theo ID sản phẩm và mã cửa hàng
// * - http://localhost:8080/api/v1/product/cuahang-(storeID)/(spID)
export const getSanPhamById = async (sanPhamId) => {
    try {
        const response = await axios.get(`${hostProduct}/cuahang-${storeID()}/${sanPhamId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by store:', error);
        throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
};


//* Hàm tìm kiếm sản phẩm theo tên
export const searchSanPhamByName = (tenSanPham) => {
    return axios.get(`${hostProduct}/cuahang-${storeID()}/tim-kiem/tensanpham?ten=${tenSanPham}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
};

// * Hàm tìm kiếm sản phẩm theo thể loại
export const searchProductsByCategoryID = (categoryID) => {
    return axios.get(`${hostProduct}/cuahang-${storeID()}/tim-kiem/theloai?category=${categoryID}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}

// * Hàm thêm sản phẩm mới

export const addSanPham = (newProduct) => {
    return axios.post(`${hostProduct}/cuahang-${storeID()}`, newProduct)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('L��i khi thêm sản phẩm mới:', error);
            throw error;
        });
};

// * Hàm cập nhật sản phẩm
export const updateSanPham = (productId, updatedProduct) => {
    return axios.put(`${hostProduct}/cuahang-${storeID()}/${productId}`, updatedProduct)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            throw error;
        });
};

// * Hàm xóa sản phẩm
export const deleteBook = (productId) => {
    return axios.delete(`${hostProduct}/cuahang-${storeID()}/${productId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Lỗi khi xóa sản phẩm:', error);
            throw error;
        });
};


// *======================================= Hàm lấy số lượng - start ===========================================

// * Đếm số lượng sản phẩm theo cửa hàng
export const getCountBooksAll = () => {
    return axios.get(`${hostProduct}/cuahang-${storeID()}/count`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}

// *======================================= Hàm lấy số lượng - end ===========================================
