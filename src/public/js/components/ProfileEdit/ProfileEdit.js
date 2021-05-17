import React, { useEffect, useState } from "react";

import styles from "./ProfileEdit.scss";
import MenuItemHeader from "Components/ProfileSettings/MenuItemHeader/MenuItemHeader";
import Input, { INPUT_TYPES } from "Components/Shared/Input/Input";
import Title from "Components/Shared/Title/Title";
import Button, { BUTTON_TYPES } from "Components/Shared/Button/Button";
import { default as Select } from "react-select";
import { pathToEmployeesPage } from "Utils/path-helpers/routerPaths";
import { isEmpty } from "Utils/object-helpers/object-helpers";

const FIELDS_CONFIG = [
  {
    key: "name",
    label: "name",
  },
  {
    key: "surname",
    label: "surname",
  },
  {
    key: "patronymic",
    label: "patronymic",
  },
  {
    key: "sex",
    label: "sex",
    type: "select",
    options: [
      { value: "mr", label: "MR" },
      { value: "ms", label: "MS" },
    ],
  },
  {
    key: "department",
    label: "department",
  },
  {
    key: "room",
    label: "room",
  },
  {
    key: "mobile",
    label: "mobile",
  },
  {
    key: "email",
    label: "email",
  },
  {
    key: "role",
    label: "role",
    type: "select",
    options: [
      { value: "admin", label: "Admin" },
      { value: "default", label: "Default" },
    ],
  },
];

const ProfileEdit = ({
  createProfile,
  employee,
  history,
  isCreateMode,
  removeProfile,
  saveEdits,
}) => {
  const [userInfo, setUserInfo] = useState(isCreateMode ? {} : employee);

  const myChangeHandler = (key, value) => {
    setUserInfo((prevState) => ({ ...prevState, [key]: value }));
  };

  const isButtonDisabled = isEmpty(userInfo) || Object.keys(userInfo).length < 9;

  const onSaveButtonClick = () => {
    if (!isButtonDisabled) {
      if (isCreateMode) {
        return createProfile(userInfo, history);
      }
      saveEdits(userInfo);
    }
  };

  const onRemoveButtonClick = () => {
    removeProfile(userInfo.id, history);
  };

  return (
    <div className={styles.profile_edit}>
      <MenuItemHeader>{isCreateMode ? "Create profile" : "Edit profile"}</MenuItemHeader>
      <ul className={styles.profile_edit__list}>
        {FIELDS_CONFIG.map((item) => (
          <li key={item.key} className={styles.profile_edit__list_item}>
            {item.type === "select" ? (
              <>
                <Title className={styles.profile_edit__list_item_title}>{item.label}</Title>
                <div className={styles.profile_edit__select}>
                  <Select
                    value={item.options.find((option) => option.value === userInfo[item.key])}
                    onChange={(inputValue) => myChangeHandler(item.key, inputValue.value)}
                    options={item.options}
                  />
                </div>
              </>
            ) : (
              <>
                <Title className={styles.profile_edit__list_item_title}>{item.label}</Title>
                <Input
                  key={item.key}
                  value={userInfo[item.key]}
                  placeholder={`input ${item.label}...`}
                  type={INPUT_TYPES.DEFAULT}
                  onChange={(inputValue) => myChangeHandler(item.key, inputValue)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
      {!isCreateMode && (
        <Button
          type={BUTTON_TYPES.DELETE}
          additionalClassNames={styles.profile_edit__button}
          onClick={onRemoveButtonClick}
        >
          Remove profile
        </Button>
      )}
      <Button
        type={BUTTON_TYPES.DEFAULT_SOLID}
        additionalClassNames={styles.profile_edit__button}
        isDisabled={isButtonDisabled}
        onClick={onSaveButtonClick}
      >
        {isCreateMode ? "Create profile" : "Save edits"}
      </Button>
    </div>
  );
};

export default ProfileEdit;
