import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  text: string;
  type: "primary" | "secondary" | "tertiary" | "tertiary-secondary";
  size: "small" | "medium" | "large" | "extra-large" | "extra-extra-large";
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
          : props.type === "tertiary"
          ? `${styles.buttonTertiary}`
          : `${styles.buttonTertiarySecondary}`) +
        " " +
        (props.size === "small"
          ? `${styles.buttonSmall}`
          : props.size === "medium"
          ? `${styles.buttonMedium}`
          : props.size === "large"
          ? `${styles.buttonLarge}`
          : props.size === "extra-large"
          ? `${styles.buttonExtraLarge}`
          : `${styles.buttonExtraExtraLarge}`)
      }
      onClick={props.function && props.function.bind(this)}
    >
      {props.text}
    </button>
  );
};

export default Button;
