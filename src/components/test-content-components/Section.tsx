import React from "react";
import styles from "@/styles/app.module.css";
import { Section } from "@/utils/testCreatorHelper";

// export interface SectionData {
//   name: string;
//   description?: string;
//   questions: QuestionData[];
// }

interface Props {
  sectionNr: number;
  section: Section;
}

const SectionEntry = (props: Props) => {
  return (
    <>
      <span className={styles.testSectionTitle}>
        {props.section.name || `Section ${props.sectionNr}`}
      </span>
      {props.section.description && (
        <span className={styles.testSectionDescription}>
          {props.section.description}
        </span>
      )}
    </>
  );
};

export default SectionEntry;
