import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  text: string;
  type: "primary" | "secondary" | "tertiary";
  size: "small" | "medium" | "large" | "extra-large";
  function?: Function;
}

const Button = (props: Props) => {
  return (
    <button
      type="button"
      className={
        (props.type === "primary"
          ? `${styles.buttonPrimary}`
          : props.type === "secondary"
          ? `${styles.buttonSecondary}`
          : `${styles.buttonTertiary}`) +
        " " +
        (props.size === "small"
          ? `${styles.buttonSmall}`
          : props.size === "medium"
          ? `${styles.buttonMedium}`
          : props.size === "large"
          ? `${styles.buttonLarge}`
          : `${styles.buttonExtraLarge}`)
      }
      onClick={props.function && props.function.bind(this)}
    >
      {props.text}
    </button>
  );
};

export default Button;
