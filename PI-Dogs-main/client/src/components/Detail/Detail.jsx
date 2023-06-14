import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById, deleteDogId } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.details);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getById(id));
    return () => dispatch(deleteDogId());
  }, [dispatch, id]);

  return (
    <div className={style.detailAll}>
      <div className={style.contentContainer}>
        <h1 className={style.titleName}>{dog.name}</h1>
        <div className={style.imageContainer}>
          <img className={style.image} src={dog.image} alt={dog.name} />
        </div>
        <p className={style.temperaments}>
          Temperament: {dog.temperament ? dog.temperament.join(", ") : ""}
        </p>
        <p className={style.info}>ID: {dog.id}</p>
        <p className={style.info}>Life expectancy: {dog.age}</p>
        <p className={style.info}>Height: {dog.height} cm</p>
        <p className={style.info}>Weight: {dog.weight} kg</p>
      </div>
    </div>
  );
};

export default Detail;