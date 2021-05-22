import React from "react";
import Button, { BUTTON_TYPES } from "Components/Shared/Button/Button";
import Input from "../Input/Input";
import { isEmail } from "Utils/string-helpers/string-helpers";
import styles from "../SignInPage.scss";

class SignUpForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    isUserNameInvalid: false,
    isEmailInvalid: false,
    isPasswordInvalid: false
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    if (username && isEmail(email) && password) {
      this.props.onSubmit({
        username,
        email,
        password
      });
    } else {
      this.setState({
        isUserNameInvalid: !username,
        isEmailInvalid: !isEmail(email),
        isPasswordInvalid: !password
      });
    }
  };

  handleUserNameChange = (username) => {
    this.setState({
      username,
      isUserNameInvalid: false
    });
  };

  handleEmailChange = (email) => {
    this.setState({
      email,
      isEmailInvalid: false
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password,
      isPasswordInvalid: false
    });
  };

  render() {
    const { isUserNameInvalid, isEmailInvalid, isPasswordInvalid } = this.state;

    return (
      <form onSubmit={(e) => this.onSubmit(e)} className={styles.right_column_content}>
        <p className={styles.title}>Sign Up</p>
        <Input
          onChange={(value) => this.handleUserNameChange(value)}
          title={"Username"}
          placeholder={"Jane Doe"}
          isInvalid={isUserNameInvalid}
          isFocusedByDefault
        />
        <Input
          onChange={(value) => this.handleEmailChange(value)}
          title={"Email"}
          isInvalid={isEmailInvalid}
          placeholder={"janedoe@gmail.com"}
        />
        <Input
          autoComplete={"off"}
          onChange={(value) => this.handlePasswordChange(value)}
          title={"Password"}
          isInvalid={isPasswordInvalid}
          placeholder={"psswrd22"}
          type={"password"}
        />
        <p className={styles.tip_password}>
          Make sure it's at least 15 characters OR at least 8 characters including a number and a
          lowercase letter.
        </p>
        <div className={styles.submit_button_wrapper}>
          <Button
            style={{
              width: "100%"
            }}
            type={BUTTON_TYPES.DEFAULT_SOLID}
          >
            Загрузить
          </Button>
        </div>
        <p className={styles.tip_policy}>
          By clicking “Sign up”, you agree to our Terms of Service and Privacy Statement. We’ll
          occasionally send you account related emails.
        </p>
      </form>
    );
  }
}

export default SignUpForm;
