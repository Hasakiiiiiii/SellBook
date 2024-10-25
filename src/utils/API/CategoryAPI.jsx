import axios from 'axios';

const hostCategory = "http://localhost:8080/api/v1/category";

// * Hàm lấy Thể Loại - http://localhost:8080/api/v1/category
export const getCategory = () => {
    return axios.get(`${hostCategory}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}

// * Hàm lấy Thể Loại theo ID - http://localhost:8080/api/v1/category/(ID)
export const getCategoryByID = (categoryID) => {
    return axios.get(`${hostCategory}/${categoryID}`)
        .then(response => {
            return response.data.result;
        })
        .catch(error => {
            console.error('Error fetching products by store:', error);
            throw error;
        });
}