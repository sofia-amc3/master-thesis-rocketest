import React, { ChangeEvent } from "react";
import Image from "next/image";
import styles from "../../styles/app.module.css";
import { FindTestersSearchFilters } from "@/pages/tests/myTests/testDetail/[_id]/findTesters";

interface Props {
  text?: string;
  selected: boolean;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  testerOptions: FindTestersSearchFilters;
  onChange: (valueToUpdate: Partial<FindTestersSearchFilters>) => void;
}

const TestersSearch = (props: Props) => {
  const sortFunction = () => {
    let sortType;
    if (props.testerOptions && props.testerOptions.sort === "ASC") {
      sortType = "DESC";
    } else {
      sortType = "ASC";
    }

    props.onChange({ sort: sortType });
  };

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
          value={props.testerOptions.search}
          onChange={(e) => {
            props.onChange({ search: e.target.value });
          }}
        />
      </div>

      <div className={styles.sortIconContainer} onClick={sortFunction}>
        <Image
          src="/icons/sort.svg"
          alt="Sort Icon"
          width={19}
          height={19}
          className={`${styles.sort} ${styles[props.testerOptions.sort || ""]}`}
        />
      </div>

      <div className={styles.testersSelectAllCheckbox}>
        <input
          type="checkbox"
          value="selectTesters"
          checked={props.selected}
          onChange={(e) => props.onSelect(e)}
        />
        <label>Select All</label>
      </div>
    </div>
  );
};

export default TestersSearch;
