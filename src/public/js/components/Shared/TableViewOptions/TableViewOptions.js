import React from "react";
import { default as pt } from "prop-types";
import { isArray } from "Utils/array-helpers/array-helpers";
import Button, { BUTTON_TYPES } from "../Button/Button";
import styles from "./TableViewOptions.scss";

const DEFAULT_VIEW_OPTIONS = [
  { key: 10, label: "10" },
  { key: 20, label: "20" },
  { key: 50, label: "50" },
  { key: 100, label: "100" }
];

const TableViewOptions = ({ currentViewOption, viewOptions, onChange }) => {
  if (isArray(viewOptions)) {
    return (
      <div className={styles.container}>
        {viewOptions.map((item, i) => {
          const isCurrentOptions = currentViewOption === item.key;
          return (
            <Button
              key={i}
              type={isCurrentOptions ? BUTTON_TYPES.VIEW_OPTION_CURRENT : BUTTON_TYPES.VIEW_OPTION}
              onClick={() => onChange(item.key)}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    );
  }
  return null;
};

export default TableViewOptions;

TableViewOptions.propTypes = {
  currentViewOption: pt.number,
  viewOptions: pt.arrayOf(
    pt.shape({
      key: pt.number,
      label: pt.string
    })
  ),
  onChange: pt.func
};

TableViewOptions.defaultProps = {
  currentViewOption: DEFAULT_VIEW_OPTIONS[0].key,
  viewOptions: DEFAULT_VIEW_OPTIONS,
  onChange: () => {}
};
