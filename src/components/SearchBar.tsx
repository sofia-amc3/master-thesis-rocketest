import React from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <Image src="/icons/search.svg" alt="Search Icon" width={18} height={18} />
      <input
        type="text"
        id="fname"
        name="fname"
        placeholder="Search for something in this page..."
        disabled
        className={styles.disabled}
      />
    </div>
  );
};

export default SearchBar;
