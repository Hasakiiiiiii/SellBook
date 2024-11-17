import React from 'react';
import styles from './HomeUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ onSearchResults, setQuery, query }) {

    const handleSearch = () => {
        if (!query.trim()) {
            onSearchResults([]); // Trả về kết quả rỗng nếu truy vấn rỗng
            return;
        }
        onSearchResults(); // Thực hiện tìm kiếm khi query không rỗng
    };

    return (
        <div className={styles.searchBar}>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} // Cập nhật query trực tiếp
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
                placeholder="Tìm kiếm sản phẩm..." 
            />
            <button className={styles.searchButton} onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} /> {/* Icon tìm kiếm */}
            </button>
        </div>
    );
}
