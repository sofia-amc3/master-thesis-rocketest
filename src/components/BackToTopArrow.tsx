import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";

const BackToTopArrow = () => {
  const [showButton, setShowButton] = useState(false);
  let mainWindow: HTMLElement;

  const scrollToTop = () => {
    mainWindow.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setShowButton(false);
    mainWindow = document.getElementsByTagName("main")[0];

    mainWindow.addEventListener("scroll", () => {
      if (mainWindow.scrollTop > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  });

  return showButton ? (
    <Image
      className={styles.backToTopArrow}
      src="/icons/arrow.svg"
      alt="Back To Top Arrow"
      width={40}
      height={40}
      onClick={scrollToTop}
    />
  ) : (
    <></>
  );
};

export default BackToTopArrow;
