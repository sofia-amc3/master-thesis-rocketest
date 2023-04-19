import React from "react";
import Section, {
  SectionData,
} from "@/components/test-content-components/Section";
import styles from "@/styles/app.module.css";

interface TestData {
  name: string;
  author: string;
  type: string;
  description: string;
  sections: SectionData[];
}
interface Props {
  testData: TestData;
}

const Test = (props: Props) => {
  return (
    <>
      <h1>{props.testData.name}</h1>
      <h4>
        {props.testData.type} from {props.testData.author}
      </h4>

      {props.testData.description && (
        <span className={styles.testSectionDescription}>
          {props.testData.description}
        </span>
      )}

      {props.testData.sections.map((section, sectionKey) => {
        return (
          <Section
            sectionNr={sectionKey + 1}
            section={section}
            key={sectionKey}
          />
        );
      })}
    </>
  );
};

export default Test;
