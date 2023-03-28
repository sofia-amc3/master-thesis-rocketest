import React from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";

const TestsSearch = () => {
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

      <select name="testStatus">
        <option value="inProgress">In Progress</option>
        <option value="finished">Finished</option>
      </select>

      <select name="filters">
        <option value="inProgress">Filter By</option>
        <option value="nameFilter">Name</option>
        <option value="noTestersFilter">No. Testers</option>
        <option value="dateFilter">Date</option>
        <option value="testTypeFilter">Test Type</option>
      </select>

      <div className={styles.sortIconContainer}>
        <Image src="/icons/sort.svg" alt="Sort Icon" width={19} height={19} />
      </div>
    </div>
  );
};

export default TestsSearch;
