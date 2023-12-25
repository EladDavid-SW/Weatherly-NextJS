import { useState } from 'react';
import styles from '@/styles/SearchBar.module.css'; 
import Image from 'next/image'

const SearchBar = ({ onSearch }) => {
  const [searchData, setSearchData] = useState('');

  const handleSearchChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(searchData);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Enter a city"
        value={searchData}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
       <button onClick={handleSubmit} className={styles.searchButton}>
       <Image src={`/icons/search.png`} alt='search' width='20' height='20'  />
      </button>
    </div>
  );
};

export default SearchBar;
