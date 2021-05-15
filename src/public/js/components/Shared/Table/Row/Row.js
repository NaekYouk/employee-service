import React, { Fragment } from "react";
import { default as pt } from "prop-types";
import styles from "./Row.scss";
import { getHumanizedDate } from "Utils/date-helpers/date-helpers";
import Input, { INPUT_TYPES } from "Components/Shared/Input/Input";

const ENTER_KEY_CODE = 13;

export default class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTitleEditable: false,
      isTitleInvalid: false,
      initialTitle: props.rowData.title,
      currentTitle: props.rowData.title,
      id: props.rowData.id
    };
    this.rowRef = React.createRef();
  }

  componentDidMount = () => {
    document.addEventListener("click", (e) => this.handleClickOutsideRow(e));
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.rowData.title !== this.props.rowData.title) {
      this.setInitialState();
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener("click", (e) => this.handleClickOutsideRow(e));
  };

  setInitialState = () => {
    this.setState({
      isTitleEditable: false,
      isTitleInvalid: false,
      initialTitle: this.props.rowData.title,
      currentTitle: this.props.rowData.title,
      id: this.props.rowData.id
    });
  };

  handleClickOutsideRow = ({ target }) => {
    const { isTitleEditable } = this.state;

    if (!isTitleEditable) return;
    if (!this.rowRef.current || this.rowRef.current.contains(target)) return;

    this.setNewTitle();
  };

  setNewTitle = () => {
    const { onTitleChange } = this.props;
    const { id, currentTitle, initialTitle } = this.state;

    if (currentTitle) {
      this.setState(
        {
          isTitleEditable: false
        },
        () => {
          if (initialTitle !== currentTitle) {
            onTitleChange && onTitleChange(id, currentTitle);
          }
        }
      );
    } else {
      this.setState({
        isTitleInvalid: true
      });
    }
  };

  handleTitleChange = (value) => {
    this.setState({
      currentTitle: value,
      isTitleInvalid: false
    });
  };

  handleTitleKeyDown = ({ keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) {
      this.setNewTitle();
    }
  };

  getCellClassname = ({ width, onCellClick, textAlign, isHeadingColumn }) => {
    let className = styles.cell;
    if (width) {
      className += ` ${styles[width]}`;
    } else {
      className += ` ${styles.medium}`;
    }
    if (textAlign) {
      className += ` ${styles[`${textAlign}Align`]}`;
    }
    if (onCellClick) {
      className += ` ${styles.pointer}`;
    }
    if (isHeadingColumn) {
      className += ` ${styles.headingColumn}`;
    }
    return className;
  };

  onCellClick = (e, column, rowData, isAdministrator) => {
    if (isAdministrator) {
      if (column.key === "title") {
        e.stopPropagation();

        this.setState({
          isTitleEditable: true,
          initialTitle: rowData[column.key],
          currentTitle: rowData[column.key]
        });
      }
    }
  };

  getCellContent = (column, rowData) => {
    let cellContent = rowData[column.key];

    if (column.type === "date") {
      if (column.key === "lastPost") {
        cellContent = (
          <Fragment>
            <span>
              <span className={styles.gray}>
                {this.getDateCellContent(rowData[column.key], column.humanize)}
              </span>
              {" by "}
              <span className={styles.user}>{rowData.author}</span>
            </span>
          </Fragment>
        );
      } else {
        cellContent = this.getDateCellContent(rowData[column.key], column.humanize);
      }
    }

    return (
      <Fragment>
        {column.icon && <span className={styles.icon}>{column.icon}</span>}
        {column.key === "title" ? this.getTitle() : cellContent}
      </Fragment>
    );
  };

  getTitle = () => {
    const { isTitleEditable, isTitleInvalid, currentTitle } = this.state;

    if (isTitleEditable) {
      return (
        <Input
          isFocusedByDefault
          name={INPUT_TYPES.TOPIC_TITLE}
          onChange={(value) => this.handleTitleChange(value)}
          onKeyDown={(e) => this.handleTitleKeyDown(e)}
          value={currentTitle}
          isInvalid={isTitleInvalid}
        />
      );
    }
    return currentTitle;
  };

  getDateCellContent = (date, humanize) => {
    if (humanize) {
      return getHumanizedDate(date);
    }
    return date;
  };

  render = () => {
    const { rowData, config, onRowClick, isAdministrator } = this.props;
    const { isTitleInvalid } = this.state;

    return (
      <div
        ref={this.rowRef}
        onClick={(e) => onRowClick && onRowClick(e, rowData)}
        className={`
          ${styles.row} 
          ${onRowClick ? styles.clickable : ""}
          ${isTitleInvalid ? styles.invalid : ""}`}
      >
        {config.map((column) => {
          return (
            <div
              key={column.key}
              onClick={(e) => this.onCellClick(e, column, rowData, isAdministrator)}
              className={this.getCellClassname(column)}
            >
              {this.getCellContent(column, rowData)}
            </div>
          );
        })}
      </div>
    );
  };
}

Row.propTypes = {
  rowData: pt.object,
  config: pt.array,
  onRowClick: pt.func,
  isAdministrator: pt.bool
};

Row.defaultProps = {
  rowData: [],
  config: [],
  onRowClick: () => {},
  isAdministrator: false
};
