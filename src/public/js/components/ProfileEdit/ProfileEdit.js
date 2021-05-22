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
    label: "имя",
  },
  {
    key: "surname",
    label: "фамилия",
  },
  {
    key: "patronymic",
    label: "отчество",
  },
  {
    key: "sex",
    label: "пол",
    type: "select",
    options: [
      { value: "mr", label: "Муж" },
      { value: "ms", label: "Жен" },
    ],
  },
  {
    key: "department",
    label: "подразделение",
  },
  {
    key: "room",
    label: "номер кабинета",
  },
  {
    key: "mobile",
    label: "моб.телефон",
  },
  {
    key: "email",
    label: "почта",
  },
  {
    key: "role",
    label: "Права",
    type: "select",
    options: [
      { value: "admin", label: "Администратор" },
      { value: "default", label: "Стандартные" },
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
      <MenuItemHeader>{isCreateMode ? "Создать профиль" : "Редактировать профиль"}</MenuItemHeader>
      <ul className={styles.profile_edit__list}>
        {FIELDS_CONFIG.map((item) => (
          <li key={item.key} className={styles.profile_edit__list_item}>
            {item.type === "select" ? (
              <>
                <Title className={styles.profile_edit__list_item_title}>{item.label}</Title>
                <div className={styles.profile_edit__select}>
                  <Select
                    placeholder={'Выбрать...'}
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
                  placeholder={`Введите ${item.label}...`}
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
          Удалить профиль
        </Button>
      )}
      <Button
        type={BUTTON_TYPES.DEFAULT_SOLID}
        additionalClassNames={styles.profile_edit__button}
        isDisabled={isButtonDisabled}
        onClick={onSaveButtonClick}
      >
        {isCreateMode ? "Создать профиль" : "Сохранить профиль"}
      </Button>
    </div>
  );
};

export default ProfileEdit;
