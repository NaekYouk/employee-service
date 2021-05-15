import React from "react";
import SectionTitle from "Components/EmployeePage/RightSection/SectionTitle/SectionTitle";
import DepartmentIcon from "../../../../static/icons/department.svg";
import RoomIcon from "../../../../static/icons/room.svg";
import PhoneIcon from "../../../../static/icons/phone_1.svg";
import EmailIcon from "../../../../static/icons/email.svg";

import styles from "./RightSection.scss";

const RightSection = ({ department, email, mobile, room }) => {
  return (
    <div className={styles.right_section}>
      <SectionTitle title={"General Info"}>
        <ul>
          <li>
            <DepartmentIcon />
            <p className={styles.right_section__row_name}>Department</p>
            <p>{department}</p>
          </li>
          <li>
            <RoomIcon />
            <p className={styles.right_section__row_name}>Room</p>
            <p>{room}</p>
          </li>
        </ul>
      </SectionTitle>
      <SectionTitle title={"Contacts"}>
        <ul>
          <li>
            <PhoneIcon />
            <p className={styles.right_section__row_name}>Mobile phone</p>
            <a href={`tel:${mobile}`}>{mobile}</a>
          </li>
          <li>
            <EmailIcon />
            <p className={styles.right_section__row_name}>Email</p>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        </ul>
      </SectionTitle>
    </div>
  );
};

export default RightSection;
