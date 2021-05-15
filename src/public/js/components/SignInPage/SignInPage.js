import React from "react";
import SignInForm from "./SignInForm/SignInForm";
import FullScreenLoader from "../Shared/FullscreenLoader/FullScreenLoader";
import styles from "./SignInPage.scss";
import PageInfo from "./PageInfo/PageInfo";

const SignInPage = (props) => {
  const getForm = () => {
    const { authorizeUser } = props;
    return (
      <>
        <div className={styles.top_buttons}>
          <button className={styles.switch_button}>"Sign In"</button>
        </div>
        <SignInForm onSubmit={authorizeUser} />
      </>
    );
  };

  const getLoader = (isLoading) => isLoading && <FullScreenLoader showInsideCurrentComponent />;

  const getPageInfoTitle = () => {
    const { error } = props;

    if (error) {
      return "Oh no, something went wrong :(";
    }

    return <span>Welcome!</span>;
  };

  const getPageInfoMessage = () => {
    const { error, userName } = props;

    if (error) {
      return error;
    }

    return userName
      ? "Wish to switch to another account? Go ahead!"
      : "We hope you remember your password.";
  };

  const { isLoading, error } = props;
  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        {getLoader(isLoading)}
        <>
          <div className={styles.left_column}>
            <div className={styles.page_message_wrapper}>
              <PageInfo
                type={error ? "error" : "default"}
                title={getPageInfoTitle()}
                message={getPageInfoMessage()}
              />
            </div>
          </div>
          <div className={styles.right_column}>{getForm()}</div>
        </>
      </div>
    </div>
  );
};

export default SignInPage;
