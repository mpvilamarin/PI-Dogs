import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../Redux/actions/actions";
import { validate } from "./validate";
import styles from "../Form/Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    //? Estado local para todos los inputs
    id: "",
    name: "",
    height: "",
    weight: "",
    age: "",
    image: "",
    createInDb: "",
    temperament: [],
    temperaments: [], //? Acá se guardan los temperamentos filtrados para el select
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemps, setSelectedTemps] = useState([]);
  const [errors, setErrors] = useState({});
  const [filter] = useState("");
  const filteredTemps = temperaments?.filter((temp) =>
    temp.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChange = (event) => {
    //? Manejo del input
    const { name, value } = event.target;
    const error = validate(name, value);
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      //? Manejo de errores
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSelect = (event) => {

    const selectedTemperament = event.target.value;  // Selección de temperamentos para que se mantengan los que ya se eligieron
    setInput((prevInput) => ({
      ...prevInput,
      temperament: [...prevInput.temperament, selectedTemperament],
      temperaments: Array.isArray(prevInput.temperaments)
        ? [...prevInput.temperaments, selectedTemperament]
        : [selectedTemperament],
    }));
    setSelectedTemps((prevSelectedTemperaments) => [
      ...prevSelectedTemperaments,
      selectedTemperament,
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(input);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(postDog(input));
      setInput({
        id: "",
        name: "",
        height: "",
        weight: "",
        age: "",
        image: "",
        createInDb: "",
        temperament: [],
        temperaments: [],
      });
    }
  };

  const handleRemove = (temperament) => {
    setSelectedTemps((prevSelectedTemps) =>
      prevSelectedTemps.filter((temp) => temp !== temperament)
    );
  };

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
              <label className={styles.label}>Imagen URL:</label>
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
              {errors.temperaments && (
                <p className={styles.error}>{errors.temperaments}</p>
              )}
              <select
                id="temperaments"
                onChange={handleSelect}
                className={styles.select}
              >
                <option value="">Select</option>
                {filteredTemps?.sort().map((temp) => (
                  <option key={temp} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>
              <div className={styles.selectedTemps}>
                {selectedTemps?.sort().map((temp) => (
                  <div key={temp?.id} className={styles.selectedTemp}>
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