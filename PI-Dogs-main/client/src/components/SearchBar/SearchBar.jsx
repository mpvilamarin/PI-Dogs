import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../Redux/actions/actions"
import styles from "../SearchBar/SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (event) => {
    setSearchName(event.target.value);
    setError("");
  };

  const handleKeyDown = (event) => {   // El controlador handleKeyDown verifica si la tecla presionada es enter y realiza la búsqueda
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
  const search = searchName.trim().toLowerCase();
  if (!search) {
    setError("Please enter a name");
    return;
  } else if (!search.match(/^[a-zA-Z\s]+$/)) {
    setError("Please enter alphabetic values");
    return;
  }

  dispatch(getByName(search))
    .then(() => {
      onSearch(search);
      setSearchName("");
    })
    .catch(() => {
      setError("An error has occurred in the search");
    });
};

  return (
    <div className={styles.SearchBarContainer}>
      <input
        className={styles.SearchInput}
        type="text"
        value={searchName}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.SearchButton}
        onClick={handleSearch}
        disabled={!searchName}
      >
        Search
      </button>
      {error && <p className={styles.Error}>{error}</p>}
    </div>
  );
};

export default SearchBar;