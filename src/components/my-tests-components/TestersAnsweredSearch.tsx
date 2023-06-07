import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/app.module.css";
import { TestersSearchFilters } from "@/pages/tests/myTests/testDetail/[_id]";

interface Props {
  options: string[];
  testOptions: TestersSearchFilters;
  onChange: (valueToUpdate: Partial<TestersSearchFilters>) => void;
}

const TestersAnsweredSearch = (props: Props) => {
  const sortFunction = () => {
    let sortType;
    if (props.testOptions && props.testOptions.sort === "ASC") {
      sortType = "DESC";
    } else {
      sortType = "ASC";
    }

    props.onChange({ sort: sortType });
  };

  return (
    <div
      className={`${styles.testsFiltersContainer} ${styles.testersFiltersContainer}`}
    >
      <div className={`${styles.searchbar} ${styles.testersSearchbar}`}>
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={18}
          height={18}
        />
        <input
          type="text"
          id="tname"
          name="tname"
          placeholder="Search for testers..."
          value={props.testOptions.search}
          onChange={(e) => {
            props.onChange({ search: e.target.value });
          }}
        />
      </div>

      <div className={styles.selectContainer}>
        <select
          name="selection"
          onChange={(e) => {
            props.onChange({ option: e.target.value });
          }}
        >
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

      <div className={styles.sortIconContainer} onClick={sortFunction}>
        <Image
          src="/icons/sort.svg"
          alt="Sort Icon"
          width={19}
          height={19}
          className={`${styles.sort} ${styles[props.testOptions.sort || ""]}`}
        />
      </div>
    </div>
  );
};

export default TestersAnsweredSearch;
