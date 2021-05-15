import React from "react";
import SearchIcon from "../../../../static/icons/search.svg";
import Input from "../Input/Input";
import styles from "./SearchInput.scss";

const ENTER_KEY_CODE = 13;

export default class SearchInput extends React.Component {
  state = {
    inputValue: "",
    isFocused: false
  };

  onInputChange = (inputValue) => {
    this.setState({ inputValue });
  };

  onKeyDown = ({ keyCode }, handler) => {
    if (keyCode === ENTER_KEY_CODE) {
      handler && handler(this.state.inputValue);
    }
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  render = () => {
    const { onSubmit } = this.props;
    const { isFocused, inputValue } = this.state;

    return (
      <div className={styles.searchInput__wrapper}>
        <Input
          placeholder={"Search..."}
          onKeyDown={(e) => this.onKeyDown(e, onSubmit)}
          onFocus={(e) => this.onFocus(e)}
          onBlur={(e) => this.onBlur(e)}
          customClassName={isFocused ? "" : styles.input}
          onChange={(inputValue) => this.onInputChange(inputValue)}
        />
        <span
          onClick={() => onSubmit(inputValue)}
          className={isFocused ? styles.icon__hidden : styles.icon}
        >
          <SearchIcon />
        </span>
      </div>
    );
  };
}
