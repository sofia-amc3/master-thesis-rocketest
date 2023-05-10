import React from "react";
import styles from "@/styles/app.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  function?: Function;
}

const GoBackArrow = (props: Props) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      onClick={props.function ? props.function.bind(this) : goBack}
      className={styles.goBackArrow}
    >
      <Image
        src="/icons/arrow-left.svg"
        alt="Back Arrow"
        width={16}
        height={16}
      />
    </button>
  );
};

export default GoBackArrow;
