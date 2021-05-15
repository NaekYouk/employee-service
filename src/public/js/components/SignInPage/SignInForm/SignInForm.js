import React from "react";
import Button, { BUTTON_TYPES } from "../../Shared/Button/Button";
import Input from "../Input/Input";
import styles from "../SignInPage.scss";

class SignInForm extends React.Component {
  state = {
    email: "",
    password: "",
    isEmailInvalid: false,
    isPasswordInvalid: false
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      return this.props.onSubmit({
        email,
        password
      });
    }

    this.setState({
      isEmailInvalid: !email,
      isPasswordInvalid: !password
    });
  };

  onEmailChange = (value) => {
    this.setState({ email: value, isEmailInvalid: false });
  };

  onPasswordChange = (value) => {
    this.setState({ password: value, isPasswordInvalid: false });
  };

  render() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)} className={styles.right_column_content}>
        <p className={styles.title}>Sign In</p>
        <Input
          isInvalid={this.state.isEmailInvalid}
          onChange={(value) => this.onEmailChange(value)}
          title={"Email"}
          placeholder={"johndoeforever@email.com"}
          isFocusedByDefault
        />
        <Input
          isInvalid={this.state.isPasswordInvalid}
          autoComplete={"off"}
          onChange={(value) => this.onPasswordChange(value)}
          title={"Password"}
          type={"password"}
          placeholder={"*bestpwdever*"}
        />
        <div className={styles.submit_button_wrapper}>
          <Button
            style={{
              width: "100%"
            }}
            type={BUTTON_TYPES.DEFAULT_SOLID}
          >
            Sign In
          </Button>
        </div>
      </form>
    );
  }
}

export default SignInForm;
