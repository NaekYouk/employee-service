import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmployeeCard.scss";

const EmployeeCard = ({ id, name, surname, image }) => {
  return (
    <div className={styles.employee__card}>
      <Link className={styles.employee__card_link} to={`${id}`}>
        <div className={styles.employee__card__img_wrapper}>
          <img className={styles.employee__card__img} src={image || "https://place-hold.it/150"} />
        </div>
        <div className={styles.employee__card_label_container}>
          <p className={styles.employee__card_label}>{name}</p>
          <p className={styles.employee__card_label}>{surname}</p>
        </div>
      </Link>
    </div>
  );
};

export default EmployeeCard;
