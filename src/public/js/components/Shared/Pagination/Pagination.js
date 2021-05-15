import React from "react";
import { default as pt } from "prop-types";
import Button, { BUTTON_TYPES } from "../Button/Button";
import styles from "./Pagination.scss";

const Pagination = ({ currentPage, dataItemsCount, optionsPerPageNumber, onChange }) => {
  const pagesCount = Math.ceil(dataItemsCount / optionsPerPageNumber);
  if (pagesCount > 1) {
    return (
      <div className={styles.pagination}>
        {new Array(pagesCount).fill().map((item, i) => {
          const pageNumber = i + 1;
          const isCurrentPage = currentPage === pageNumber;
          return (
            <Button
              key={i}
              type={isCurrentPage ? BUTTON_TYPES.PAGINATION_CURRENT : BUTTON_TYPES.PAGINATION}
              onClick={() => onChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>
    );
  }
  return null;
};

export default Pagination;

Pagination.propTypes = {
  currentPage: pt.number.isRequired,
  dataItemsCount: pt.number.isRequired,
  optionsPerPageNumber: pt.number.isRequired,
  onChange: pt.func.isRequired
};

Pagination.defaultProps = {
  currentPage: 0,
  dataItemsCount: 0,
  optionsPerPageNumber: 0,
  onChange: () => {}
};
