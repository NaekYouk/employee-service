import React, { useEffect } from "react";
import FullScreenLoader from "Components/Shared/FullscreenLoader/FullScreenLoader";
import LeftSection from "Components/EmployeePage/LeftSection/LeftSection";
import RightSection from "Components/EmployeePage/RightSection/RightSection";

import styles from "./EmployeePage.scss";

const EmployeePage = ({
  match,
  history,
  getEmployeeData,
  isLoading,
  employee,
  role,
  showModal,
}) => {
  useEffect(() => {
    const employeeId = match.params.id;

    if (!employeeId) {
      return history.push("/");
    }
    getEmployeeData(employeeId, history);
  }, []);

  if (isLoading) {
    return <FullScreenLoader showInsideCurrentComponent />;
  }

  return (
    <div className={styles.employee_page__container}>
      <LeftSection
        id={employee.id}
        showModal={showModal}
        name={employee.name}
        surname={employee.surname}
        sex={employee.sex}
        role={role}
      />
      <RightSection
        department={employee.department}
        email={employee.email}
        mobile={employee.mobile}
        room={employee.room}
      />
    </div>
  );
};

export default EmployeePage;
