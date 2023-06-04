import React, { MouseEventHandler } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";

interface Props {
  previousPageArrow?: boolean;
  nextPageArrow?: boolean;
  currentPageNr: number;
  totalPagesNr: number;
  nextPageFunction: MouseEventHandler<HTMLAnchorElement>;
  previousPageFunction: MouseEventHandler<HTMLAnchorElement>;
}

const PagesSlider = (props: Props) => {
  return (
    <div
      className={`${styles.pagesSlider} ${
        !props.previousPageArrow && !props.nextPageArrow
          ? styles.sliderWithoutArrows
          : ""
      }`}
    >
      {props.previousPageArrow && (
        <Link href="#" onClick={props.previousPageFunction}>
          <Image
            src="/icons/arrow-left.svg"
            alt="Arrow Left"
            width={14}
            height={14}
          />
        </Link>
      )}

      <span>Page</span>
      <span className={styles.currentPage}>{props.currentPageNr}</span>
      <span>of</span>
      <span>{props.totalPagesNr}</span>

      {props.nextPageArrow && (
        <Link href="#" onClick={props.nextPageFunction}>
          <Image
            src="/icons/arrow-left.svg"
            alt="Arrow Right"
            width={14}
            height={14}
            className={styles.arrowRight}
          />
        </Link>
      )}
    </div>
  );
};

export default PagesSlider;
