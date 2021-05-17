import React, { useEffect } from "react";
import "./Employees.scss";
import FullScreenLoader from "Components/Shared/FullscreenLoader/FullScreenLoader";
import EmployeeCard from "Components/Employees/EmployeeCard/EmployeeCard";
import { getQueryValueByKey } from "Utils/path-helpers/pathUtils";
import styles from "./Employees.scss";

const Employees = ({ employees, isLoading, location, history, searchEmployees }) => {
  useEffect(() => {
    const fullNameValue = getQueryValueByKey(location, "fullName");

    if (!fullNameValue) {
      return history.push("/");
    }

    searchEmployees(fullNameValue);
  }, [location]);

  if (isLoading) {
    return <FullScreenLoader showInsideCurrentComponent />;
  }

  const EmployeesList = employees.map((employee) => (
    <EmployeeCard key={employee.id} {...employee} />
  ));

  return <div className={styles.employees__container}>{EmployeesList}</div>;
};

export default Employees;
