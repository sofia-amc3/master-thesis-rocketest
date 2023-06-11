import React from "react";
import Image from "next/image";
import styles from "../../styles/app.module.css";

interface Props {
  text?: string;
}

const TestersSearch = (props: Props) => {
  return (
    <div
      className={`${styles.testsFiltersContainer} ${styles.findTestersFiltersContainer}`}
    >
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
          placeholder="Search for testers..."
        />
      </div>

      <div className={styles.sortIconContainer}>
        <Image src="/icons/sort.svg" alt="Sort Icon" width={19} height={19} />
      </div>

      <div className={styles.testersSelectAllCheckbox}>
        <input type="checkbox" value="selectTesters" />
        <label>Select All</label>
      </div>
    </div>
  );
};

export default TestersSearch;
