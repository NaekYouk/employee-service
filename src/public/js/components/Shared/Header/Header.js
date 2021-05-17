import React, { memo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { pathToMainPage } from "Utils/path-helpers/routerPaths";
import MainLogo from "Icons/logo-main.png";
import UserInfo from "Containers/UserInfo/UserInfo";
import styles from "./Header.scss";
import CreateEmployee from "Containers/CreateEmployee/CreateEmployee";
import { isUserAdmin } from "Utils/user-helpers/user-helpers";

const HEADER_CONFIG = [
  {
    children: "Home",
    path: pathToMainPage(),
    isExact: true,
  },
  {
    children: <CreateEmployee />,
    adminOnly: true,
  },
  {
    children: <UserInfo />,
  },
];

const Header = ({ role }) => {
  const getListLink = (navLink) => {
    const isAdmin = isUserAdmin(role);
    if (!navLink.adminOnly || isAdmin) {
      if (navLink.path) {
        return (
          <NavLink
            exact={navLink.isExact}
            to={navLink.path}
            className={styles.navBar_link}
            activeClassName={styles.navBar_selected}
          >
            {navLink.children}
          </NavLink>
        );
      }

      return <div className={styles.inactive_link}>{navLink.children}</div>;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_wrapper}>
        <div className={styles.header_container}>
          <a href={"/"} className={`${styles.header_logo}`}>
            <img className={styles.header_logo_icon} src={MainLogo} />
            <div className={styles.header_logo_name}>Employee Service</div>
          </a>
          <div className={styles.navBar_wrapper}>
            <nav>
              <ul>
                {HEADER_CONFIG.map((navLink, i) => (
                  <li
                    key={i}
                    className={styles.flip_in_link}
                    style={{ animationDelay: `${100 * (i + 1)}ms` }}
                  >
                    {getListLink(navLink)}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
