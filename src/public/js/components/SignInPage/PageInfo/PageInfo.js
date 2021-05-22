import React from "react";
import { default as pt } from "prop-types";
import styles from "./PageInfo.scss";

const INFO_TYPES = {
  ERROR: "error",
  DEFAULT: "default"
};

const EMAIL = 'vladislavustinovich1999@gmail.com';

const PageInfo = (props) => {
  const { type, title, message } = props;

  return (
    <div className={styles.page_message}>
      {title}
      <div className={styles.message_details}>{message}</div>
      <div className={styles.support_link}>
        {type === INFO_TYPES.ERROR
          ? "Если вы все еще испытываете эту проблему"
          : "Если у вас есть любые вопросы"}
        , пожалуйста обратитесь в нашу <a href={`mailto:${EMAIL}`}>Тех. поддержку</a>
      </div>
    </div>
  );
};

export default PageInfo;

PageInfo.propTypes = {
  type: pt.oneOf([...Object.values(INFO_TYPES)]),
  title: pt.oneOfType([pt.string, pt.object]),
  message: pt.oneOfType([pt.string, pt.object])
};

PageInfo.defaultProps = {
  type: INFO_TYPES.DEFAULT,
  title: "",
  message: ""
};
