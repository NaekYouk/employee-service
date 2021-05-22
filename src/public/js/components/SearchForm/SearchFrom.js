import React, { useState } from "react";
import styles from "./SearchFrom.scss";
import Input from "Components/SignInPage/Input/Input";
import Button, { BUTTON_TYPES } from "Components/Shared/Button/Button";
import { pathToEmployeesPage } from "Utils/path-helpers/routerPaths";

const SearchForm = ({ history }) => {
  const [searchString, setSearchString] = useState("");

  return (
    <div className={styles.searchForm}>
      <div className={styles.right_column_content}>
        <p className={styles.title}>Поиск</p>
        <Input
          placeholder={"Введите имя или фамилию"}
          value={searchString}
          onChange={(inputValue) => setSearchString(inputValue)}
          isFocusedByDefault
        />
        <div className={styles.submit_button_wrapper}>
          <Button
            style={{
              width: "100%",
            }}
            type={BUTTON_TYPES.DEFAULT_SOLID}
            isDisabled={searchString.length < 3}
            onClick={() =>
              history.push({
                pathname: pathToEmployeesPage(),
                search: `?fullName=${searchString}`,
              })
            }
          >
            Поиск
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
