import React from "react";
import styles from "@/styles/app.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const GoBackArrow = () => {
  const router = useRouter();

  const goBack = () => {
    // falta alerta a referir que vai perder os campos preenchidos em páginas de input
    router.back();
  };

  return (
    <button type="button" onClick={goBack} className={styles.goBackArrow}>
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
