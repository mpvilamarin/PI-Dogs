import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, FilterByTemperament, getTemperaments, getByName, FilterByWeight, FilterByHeight, FilterByOrigin, FilterByName } from "../../Redux/actions/actions";
import Pagination from "../Pagination/Pagination";
import Dogs from "../Dogs/Dogs";
import SearchBar from "../SearchBar/SearchBar";
import styles from "../Home/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const tempState = useSelector((state) => state.temperaments);

  // Paginado

  const [currentPage, setCurrentPage] = useState(1); // Página actual, comienza en 1
  const [dogsPerPage] = useState(8); // Cantidad de perros por página

  const lastDogIndex = currentPage * dogsPerPage;
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const resetPagination = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleClick = (event) => {

    event.preventDefault();
    resetPagination();
    dispatch(getDogs());
    window.location.reload()
  };

  const handleFilterByTemperament = (event) => {
    event.preventDefault();
    resetPagination();
    dispatch(FilterByTemperament(event.target.value));
  };

  const handleFilterByWeight = (event) => {
    event.preventDefault();
    resetPagination();
    dispatch(FilterByWeight(event.target.value));
  };

  const handleFilterByHeight = (event) => {
    event.preventDefault();
    resetPagination();
    dispatch(FilterByHeight(event.target.value));
  };

  const handleFilteredByOrigin = (event) => {
    event.preventDefault();
    resetPagination();
    dispatch(FilterByOrigin(event.target.value));
  };

  const handleFilterByName = (event) => {
    event.preventDefault();
    resetPagination();
    dispatch(FilterByName(event.target.value));
  };

  const handleSearch = (search) => {
    resetPagination();
    dispatch(getByName(search));
  };

  return (
    <div className={styles.homeAll}>
      <div className={styles.filterContainer}>
        <div className={styles.SearchBar}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className={styles.filterOption}>
          <h3 className={styles.filterTitle}>Order:</h3>
          <div className={styles.selectContainer}>
            <label className={styles.filterLabel}>Alphabetically:</label>
            <select
              className={styles.filterSelect}
              onChange={(event) => handleFilterByName(event)}
            >
              <option value="">Select</option>
              <option value="Asc">Ascending order</option>
              <option value="Dec">Descending order</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <label className={styles.filterLabel}>Weight:</label>
            <select
              className={styles.filterSelect}
              onChange={(event) => handleFilterByWeight(event)}
            >
              <option value="">Select</option>
              <option value="max">Max-Min Weight</option>
              <option value="min">Min-Max Weight</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <label className={styles.filterLabel}>Height:</label>
            <select
              className={styles.filterSelect}
              onChange={(event) => handleFilterByHeight(event)}
            >
              <option value="">Select</option>
              <option value="max">Max-Min</option>
              <option value="min">Min-Max</option>
            </select>
          </div>
        </div>
        <div className={styles.filterOption}>
          <h3 className={styles.filterTitle}>Filter:</h3>
          <div className={styles.selectContainer}>
            <label className={styles.filterLabel}>Origin:</label>
            <select
              className={styles.filterSelect}
              onChange={(event) => handleFilteredByOrigin(event)}
            >
              <option value="">Select</option>
              <option value="all">All</option>
              <option value="api">API</option>
              <option value="created">Created</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <label className={styles.filterLabel}>Temperament:</label>
            <select
              className={styles.filterSelect}
              onChange={(event) => handleFilterByTemperament(event)}
            >
              <option value="">Select</option>
              <option value="All">All temperaments</option>
              {tempState?.sort().map((temp) => (
                <option key={temp} value={temp}>
                  {temp}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
        className={styles.reloadButton}
        onClick={(event) => handleClick(event)}
      >
        Clear Filters
      </button>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Find your doggy soul mate!</h1>
      </div>

      <div className={styles.dogsContainer}>
        {currentDogs?.map((dog) => (
          <Dogs
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            weight={dog.weight}
            height={dog.height}
            temperaments={dog.temperaments}
            temperament={dog.temperament}
            createInDb={dog.createInDb}
          />
        ))}
      </div>
      <Pagination
        dogs={allDogs.length}
        dogsPerPage={dogsPerPage}
        currentPage={currentPage}
        pagination={pagination}
      />
    </div>
  );
};

export default Home;