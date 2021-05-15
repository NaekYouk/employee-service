import React from "react";
import { default as pt } from "prop-types";
import Header from "./Header/Header";
import Row from "./Row/Row";
import styles from "./Table.scss";

export default class Table extends React.Component {
  tableRef = React.createRef();

  state = {
    isTopShadowVisible: false,
    isBottomShadowVisible: false
  };

  componentDidMount = () => {
    this.setShadowsVisibility();
  };

  componentDidUpdate = (prevProps) => {
    const { isLoading } = this.props;

    if (!isLoading && isLoading !== prevProps.isLoading) {
      this.scrollToTop();
      this.setShadowsVisibility();
    }
  };

  setShadowsVisibility = () => {
    const table = this.tableRef.current;

    if (table && this.isScrollable(table)) {
      this.setState({
        isTopShadowVisible: !this.isTopReached(table),
        isBottomShadowVisible: !this.isBottomReached(table)
      });
    } else {
      this.setState({
        isTopShadowVisible: false,
        isBottomShadowVisible: false
      });
    }
  };

  getContent = () => {
    const {
      config,
      rows,
      noResultsMessage,
      onRowClick,
      onTitleChange,
      isAdministrator
    } = this.props;

    if (rows.length) {
      return rows.map((row, i) => {
        return (
          <Row
            key={i}
            rowData={row}
            config={config}
            onRowClick={onRowClick}
            onTitleChange={onTitleChange}
            isAdministrator={isAdministrator}
          />
        );
      });
    }
    return <p className={styles.noResultsMessage}>{noResultsMessage}</p>;
  };

  isBottomReached = (el) => el.scrollHeight - el.scrollTop <= el.clientHeight + 20;

  isTopReached = (el) => el.scrollTop <= 20;

  isScrollable = (el) => el.scrollHeight > el.clientHeight;

  handleTableScroll = ({ target: table }) => {
    if (this.isScrollable(table)) {
      this.setState({
        isTopShadowVisible: !this.isTopReached(table),
        isBottomShadowVisible: !this.isBottomReached(table)
      });
    }
  };

  scrollToTop = () => {
    const table = this.tableRef.current;
    if (table) {
      table.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
      });
    }
  };

  render = () => {
    const { config, rows } = this.props;
    const { isTopShadowVisible, isBottomShadowVisible } = this.state;

    return (
      <div ref={this.tableRef} className={styles.table} onScroll={(e) => this.handleTableScroll(e)}>
        <Header config={config} rows={rows} />
        <div className={`${styles.shadow__top} ${isTopShadowVisible ? styles.visible : ""}`} />
        {this.getContent()}
        <div
          className={`${styles.shadow__bottom} ${isBottomShadowVisible ? styles.visible : ""}`}
        />
      </div>
    );
  };
}

Table.propTypes = {
  config: pt.arrayOf(
    pt.shape({
      key: pt.string,
      label: pt.string,
      width: pt.oneOf(["medium", "small", "large"]),
      type: pt.oneOf(["string", "number", "date"]),
      icon: pt.any,
      textAlign: pt.oneOf(["left", "right", "center"]),
      isHeadingColumn: pt.bool,
      isSortable: pt.bool
    })
  ),
  rows: pt.array,
  noResultsMessage: pt.string,
  onRowClick: pt.func,
  onTitleChange: pt.func,
  isUserAuthorized: pt.bool,
  isLoading: pt.bool
};

Table.defaultProps = {
  config: [],
  rows: [],
  noResultsMessage: "No rows",
  onRowClick: () => {},
  onTitleChange: () => {},
  isUserAuthorized: false,
  isLoading: pt.bool
};
