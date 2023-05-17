import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/app.module.css";
import { MyTestsFilters } from "@/pages/tests/myTests";

interface Props {
  options: string[];
  filters: string[];
  testOptions: MyTestsFilters;
  onChange: (valueToUpdate: Partial<MyTestsFilters>) => void;
}

const TestsSearch = (props: Props) => {
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
          placeholder="Search for tests..."
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

      <div className={styles.selectContainer}>
        <select
          name="filters"
          onChange={(e) => {
            props.onChange({ filter: e.target.value });
          }}
        >
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

export default TestsSearch;
