import React from "react";
import { Link } from "react-router-dom";
import { deleteDog } from "../../Redux/actions/actions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../Dogs/Dogs.module.css";

const Dogs = ({ id, name, weight, height, image, temperaments, temperament, createInDb }) => {
  const [, setDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  let timer;

  const handleDeleteDog = async (id) => {
    try {
      dispatch(deleteDog(id));
      setDeleted(true);
      setShowConfirmation(true);
      timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div className={styles.dogCard}>
      <div className={styles.content}>
        <Link to={`/dogs/${id}`} className={styles.link}>
          <h3 className={styles.title}>{name}</h3>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} alt={name} />
        </div>
        </Link>
        {createInDb && Array.isArray(temperaments) && temperaments.length ? (
          <p className={styles.temperaments}>
            Temperament: {temperaments.join(", ")}
          </p>
        ) : Array.isArray(temperament) && temperament.length ? (
          <p className={styles.temperaments}>
            Temperament: {temperament?.join(", ")}
          </p>
        ) : null}
        <p className={styles.info}>Weight: {weight} kg</p>
        <p className={styles.info}>Height: {height} cm</p>
        {createInDb && (
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteDog(id)}
          >
            Delete
          </button>
        )}
        {showConfirmation && (
          <p className={styles.confirmationMessage}>
            The dog was successfully deleted
          </p>
        )}
      </div>
    </div>
  );
};

export default Dogs;