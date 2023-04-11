import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";

interface Props {
  previousPageSrc: string;
  previousPageArrow?: boolean;
  nextPageSrc: string;
  nextPageArrow?: boolean;
  currentPageNr: number;
  totalPagesNr: number;
}

const PagesSlider = (props: Props) => {
  return (
    <div className={styles.pagesSlider}>
      {props.previousPageArrow && (
        <Link href={props.previousPageSrc}>
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
        <Link href={props.nextPageSrc}>
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
