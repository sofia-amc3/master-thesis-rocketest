import React, { useEffect, useState } from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import OptionInput from "@/components/input-components/OptionInput";
import { useRouter } from "next/router";
import styles from "@/styles/app.module.css";
import TestContentsMenu from "@/components/create-test-components/TestContentsMenu";
import {
  exampleFormObject,
  question_sectionCreator,
} from "@/utils/testCreatorHelper";
import Loading from "@/components/Loading";

const EditTest = () => {
  const router = useRouter();
  const [contentMenuFocus, setContentMenuFocus] = useState(-1);
  const [formTest, setFormTest] = useState(exampleFormObject);
  const [loading, setLoading] = useState(true);

  const goToTestDetailsPage = () => {
    router.push("/tests/createTest/testDetails");
  };

  const goToCreateTestPage = () => {
    router.push("/tests/createTest/");
  };

  useEffect(() => {
    console.log("update");
    setLoading(false);
  }, [loading]);

  return (
    <>
      <Head>
        <title>Edit Test | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
        <SearchBar />
        <Breadcrumbs
          link="/tests/createTest"
          pageName="Choose Template"
          imageAppears
        />
        <Breadcrumbs
          link="/tests/createTest/editTest"
          pageName="Edit Test"
          activePage
        />
        <h1>Edit Test</h1>
        <h4>A/B Test</h4>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.createTestWrapper}>
            <h3>General</h3>
            <TextInput
              title="Name of the Test"
              placeholder="e.g. A/B Testing for [Name of Aplication]"
              defaultValue={formTest.testName}
              onChange={(e) => {}}
              mandatory
            />
            <TextInput
              title="Test Description"
              placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              defaultValue={formTest.testDescription}
              onChange={(e) => {}}
              isTextarea
            />

            <h3>Test Contents</h3>

            {formTest.question_section.length > 0 ? (
              formTest.question_section.map((q_s, key) => {
                return (
                  // Content Wrapper
                  <div
                    key={key}
                    tabIndex={0}
                    className={styles.testContentWrapper}
                    onFocus={() => {
                      console.log("focusing");
                      setContentMenuFocus(q_s.id);
                    }}
                    onBlur={() => {
                      setContentMenuFocus(-1);
                      console.log("leaving");
                    }}
                  >
                    {/* Create Test Controls - Side Menu */}
                    <TestContentsMenu
                      isVisible={contentMenuFocus === q_s.id}
                      formData={formTest}
                      q_s={q_s}
                      setForm={setFormTest}
                    />

                    {q_s.isSection ? (
                      <>
                        <TextInput
                          title="Name of Section"
                          placeholder="e.g. Section XX"
                          defaultValue={q_s.name}
                          onChange={(e) => {}}
                        />
                        <TextInput
                          title="Description of Section"
                          placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                          defaultValue={q_s.description}
                          onChange={(e) => {}}
                          isTextarea
                        />
                      </>
                    ) : (
                      <>
                        <TextInput
                          title="Name of Question"
                          placeholder="e.g. Which of these do you prefer?"
                          defaultValue={q_s.name}
                          mandatory
                          onChange={(e) => {}}
                        />
                        <span className={styles.optionsText}>Options:</span>
                        {q_s.options.map((opt, key) => {
                          return (
                            <OptionInput
                              key={key}
                              id={key}
                              mandatory={key < 2} // because it is an A/B test, we need at least two options: A and B
                              defaultValue={opt.name}
                              onChangeText={(e) => {}}
                              plusIcon={key > 0} // we can add a new option in the B one
                              trashIcon={key > 1} // we can delete an option after the B one
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              // When the test is empty, these buttons will let the user create a section or question
              <div className={styles.testContentBtns}>
                <Button
                  text="Create Section"
                  type="tertiary"
                  size="large"
                  function={() => {
                    setLoading(true);
                    setFormTest(question_sectionCreator(formTest, true));
                  }}
                />
                <Button
                  text="Create Question"
                  type="tertiary"
                  size="large"
                  function={() => {
                    setLoading(true);
                    setFormTest(question_sectionCreator(formTest, false));
                  }}
                />
              </div>
            )}

            <br />
            <br />
            <br />
            <br />
            <Button
              text="Back"
              type="secondary"
              size="large"
              function={goToCreateTestPage}
            />
            <Button
              text="Next"
              type="primary"
              size="large"
              function={goToTestDetailsPage}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default EditTest;
