import React from "react";
import Image from "next/image";
import styles from "../../styles/app.module.css";

interface Props {
  options: string[];
  filters: string[];
}

const TestsSearch = (props: Props) => {
  return (
    <div className={styles.testsFiltersContainer}>
      <div className={`${styles.searchbar} ${styles.testsSearchbar}`}>
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={18}
          height={18}
        />
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Search for something..."
        />
      </div>

      <div className={styles.selectContainer}>
        <select name="selection">
          {props.options.map((value, key) => {
            return (
              <option key={key} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <Image
          src="/icons/arrow-left.svg"
          alt="Arrow Icon"
          width={12}
          height={12}
          className={styles.arrowRotate}
        />
      </div>

      <div className={styles.selectContainer}>
        <select name="filters">
          {props.filters.map((value, key) => {
            return (
              <option key={key} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <Image
          src="/icons/filter.svg"
          alt="Filter Icon"
          width={14}
          height={14}
        />
      </div>

      <div className={styles.sortIconContainer}>
        <Image src="/icons/sort.svg" alt="Sort Icon" width={19} height={19} />
      </div>
    </div>
  );
};

export default TestsSearch;
