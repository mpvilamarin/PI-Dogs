import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../Redux/actions/actions";
import { validate } from "./validate";
import styles from "../Form/Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    age: "",
    image: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const error = validate(name, value);
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let validationErrors = {};

    for (const key in input) {
      const value = input[key];
      const error = validate(key, value, input);
      if (error) {
        validationErrors[key] = error;
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(postDog(input));
      setInput({
        name: "",
        height: "",
        weight: "",
        age: "",
        image: "",
        temperament: [],
      });
    }
  };

  const handleRemove = (temperament) => {
    setInput((prevInput) => ({
      ...prevInput,
      temperament: prevInput.temperament.filter((temp) => temp !== temperament),
    }));
  };

  const handleSelect = (event) => {
    const selectedTemperament = event.target.value;
    if (!input.temperament.includes(selectedTemperament)) {
      setInput((prevInput) => ({
        ...prevInput,
        temperament: [...prevInput.temperament, selectedTemperament],
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      temperament: "",
    }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <h1 className={styles.title}>Create your own race!</h1>
            <div className={styles.field}>
              <label className={styles.label}>Race:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                className={styles.input}
                placeholder="Dog breed name"
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Height:</label>
              <input
                type="text"
                value={input.height}
                name="height"
                onChange={handleChange}
                className={styles.input}
                placeholder="Min height - Max height"
              />
              {errors.height && <p className={styles.error}>{errors.height}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Weight:</label>
              <input
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleChange}
                className={styles.input}
                placeholder="Min weight - Max weight"
              />
              {errors.weight && <p className={styles.error}>{errors.weight}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Life expectancy:</label>
              <input
                type="text"
                value={input.age}
                name="age"
                onChange={handleChange}
                className={styles.input}
                placeholder="Min - Max"
              />
              {errors.age && <p className={styles.error}>{errors.age}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Image URL:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                className={styles.input}
                placeholder="http://example.com"
              />
              {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="temperament" className={styles.label}>
                Temperament:
              </label>
              <select
                id="temperaments"
                onChange={handleSelect}
                className={styles.select}
              >
                <option value="">Select</option>
                {temperaments?.map((temp) => (
                  <option key={temp} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>
              <div className={styles.selectedTemps}>
                {input.temperament.map((temp) => (
                  <div key={temp} className={styles.selectedTemp}>
                    <span>{temp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(temp)}
                      className={styles.removeButton}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              {errors.temperament && (
                <p className={styles.error}>{errors.temperament}</p>
              )}
            </div>
            <button type="submit" className={styles.createButton}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;