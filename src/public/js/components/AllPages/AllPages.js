import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {
  pathToCommunityPage,
  pathToEmployeesPage,
  pathToNotFoundPage,
  pathToSignInPage,
} from "Utils/path-helpers/routerPaths";
import MainPage from "Containers/MainPage/View/MainPage";
import SignInPage from "Containers/SignInPage/SignInPage";
import NotFoundPage from "Components/NotFoundPage/View/View";
import styles from "./AllPages.scss";
import Employees from "Containers/Employees/Employees";
import EmployeePage from "Containers/EmployeePage/EmployeePage";

export const PATHS = {
  ROOT: "/",
  SIGN_IN_PAGE: pathToSignInPage(),
  COMMUNITY_PAGE: pathToCommunityPage(),
  EMPLOYEE_PAGE: "/:id",
  EMPLOYEES_PAGE: pathToEmployeesPage(),
  NOT_FOUND_PAGE: pathToNotFoundPage(),
};

const AllPages = ({ isUserAuthorized, fetchUserData, userId, location }) => {
  useEffect(() => {
    if (isUserAuthorized) {
      fetchUserData(userId);
    }
  });

  if (!isUserAuthorized) {
    return <SignInPage />;
  }

  return (
    <>
      <section className={styles.page__container}>
        <div className={styles.page}>
          <Switch location={location}>
            <Route exact path={PATHS.ROOT}>
              <MainPage />
            </Route>
            <Route exact path={PATHS.NOT_FOUND_PAGE}>
              <NotFoundPage />
            </Route>
            <Route path={PATHS.EMPLOYEES_PAGE}>
              <Employees />
            </Route>
            <Route path={PATHS.EMPLOYEE_PAGE}>
              <EmployeePage />
            </Route>
            <Route path={PATHS.ROOT}>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </section>
    </>
  );
};

export default AllPages;
