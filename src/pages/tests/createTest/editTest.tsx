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
  question_sectionCreator,
  Form,
  updateNameQuestionSection,
  updateDescriptionSection,
  updateTextOption,
  updateImageOption,
  deleteImageOption,
  optionCreator,
  optionDelete,
  formTemplate,
} from "@/utils/testCreatorHelper";
import Loading from "@/components/Loading";
import Test from "@/components/test-content-components/Test";
import { PropsTestPage } from "..";

const EditTest = (props: PropsTestPage) => {
  const router = useRouter();
  const [contentMenuFocus, setContentMenuFocus] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [formTest, setFormTest] = useState(formTemplate as Form);

  const { type, rollback } = router.query;

  const updateForm = (valueToUpdate: Partial<Form>) => {
    setFormTest({
      ...formTest,
      ...valueToUpdate,
    });
  };

  const verifyMandatoryFields = () => {
    // if the following fields were not provided, the user can't proceed to the next page
    if (!formTest.testName) return false;
    if (formTest.question_section.length > 0) {
      for (let i = 0; i < formTest.question_section.length; i++) {
        const q_s = formTest.question_section[i];

        if (!q_s.isSection) {
          const options = q_s.options;

          // question name is mandatory
          if (!q_s.name || q_s.name.trim() === "") return false;

          // all options created must provide an image and a name
          for (let i = 0; i < options.length; i++) {
            if (
              !options[i].imgSrc ||
              options[i].imgSrc.trim() === "" ||
              !options[i].name ||
              options[i].name.trim() === ""
            )
              return false;
          }
        }
      }
    }

    return true;
  };

  const goToTestDetailsPage = () => {
    if (verifyMandatoryFields()) {
      // as we are not inserting any information in the database yet, we are saving it in the browser's session storage to access it later on the next page
      sessionStorage.setItem("currentTest", JSON.stringify(formTest));
      router.push("/tests/createTest/testDetails");
    } else {
      alert(
        "All mandatory fields must be fulfilled. If you've created empty options please delete them."
      );
    }
  };

  const goToCreateTestPage = () => {
    if (formTest.question_section.length > 0) {
      if (
        confirm(
          "Are you sure you want to go back? All the fields will be lost."
        )
      ) {
        sessionStorage.removeItem("currentTest");
        router.push("/tests/createTest/");
      }
    } else {
      sessionStorage.removeItem("currentTest");
      router.push("/tests/createTest/");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    if (router.isReady) {
      const curForm = sessionStorage.getItem("currentTest");
      if (curForm) {
        setFormTest(JSON.parse(curForm) as Form);
      } else {
        setFormTest({
          ...formTemplate,
          testType: type,
          testCreator: props.auth.name,
        } as Form);
      }

      setLoading(false);
    }
  }, [router]);

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
        <h4>{formTest.testType} Test</h4>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={styles.createTestWrapper}>
              <form>
                <h3>General</h3>
                <TextInput
                  title="Name of the Test"
                  placeholder="e.g. A/B Testing for [Name of Aplication]"
                  defaultValue={formTest.testName}
                  onChange={(e) => {
                    updateForm({ testName: e.target.value });
                  }}
                  mandatory
                  maxLength={40}
                />
                <TextInput
                  title="Test Description"
                  placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                  defaultValue={formTest.testDescription}
                  onChange={(e) => {
                    updateForm({ testDescription: e.target.value });
                  }}
                  isTextarea
                  textareaMaxLength={1000}
                />

                <h3>Test Contents</h3>

                {formTest.question_section.length > 0 ? (
                  formTest.question_section.map((q_s, q_sKey) => {
                    return (
                      // Content Wrapper
                      <div
                        key={q_s.id}
                        tabIndex={0}
                        className={styles.testContentWrapper}
                        onFocus={() => {
                          setContentMenuFocus(q_s.id);
                        }}
                        onBlur={() => {
                          setContentMenuFocus(-1);
                        }}
                      >
                        {/* Create Test Controls - Side Menu */}
                        <TestContentsMenu
                          isVisible={contentMenuFocus === q_s.id}
                          formData={formTest}
                          q_sKey={q_sKey}
                          setForm={setFormTest}
                        />

                        {q_s.isSection ? (
                          <>
                            <TextInput
                              title="Name of Section"
                              placeholder="e.g. Section XX"
                              defaultValue={q_s.name}
                              onChange={(e) => {
                                setFormTest(
                                  updateNameQuestionSection(
                                    formTest,
                                    q_sKey,
                                    e.target.value
                                  )
                                );
                              }}
                              maxLength={35}
                            />
                            <TextInput
                              title="Description of Section"
                              placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                              defaultValue={q_s.description}
                              onChange={(e) => {
                                setFormTest(
                                  updateDescriptionSection(
                                    formTest,
                                    q_sKey,
                                    e.target.value
                                  )
                                );
                              }}
                              isTextarea
                              textareaMaxLength={1000}
                            />
                          </>
                        ) : (
                          <>
                            <TextInput
                              title="Name of Question"
                              placeholder="e.g. Which of these do you prefer?"
                              defaultValue={q_s.name}
                              mandatory
                              onChange={(e) => {
                                setFormTest(
                                  updateNameQuestionSection(
                                    formTest,
                                    q_sKey,
                                    e.target.value
                                  )
                                );
                              }}
                              maxLength={35}
                            />
                            <span className={styles.optionsText}>Options:</span>
                            {q_s.options.map((opt, optKey) => {
                              return (
                                <OptionInput
                                  key={optKey}
                                  id={optKey}
                                  mandatory={optKey < 2} // because it is an A/B test, we need at least two options: A and B
                                  questionId={q_s.id}
                                  defaultValues={opt}
                                  onChangeText={(e) => {
                                    setFormTest(
                                      updateTextOption(
                                        formTest,
                                        q_sKey,
                                        optKey,
                                        e.target.value
                                      )
                                    );
                                  }}
                                  onChangeImg={(e) => {
                                    setFormTest(
                                      updateImageOption(
                                        formTest,
                                        q_sKey,
                                        optKey,
                                        e
                                      )
                                    );
                                  }}
                                  onDeleteImg={() => {
                                    setFormTest(
                                      deleteImageOption(
                                        formTest,
                                        q_sKey,
                                        optKey
                                      )
                                    );
                                  }}
                                  plusIcon={
                                    optKey === q_s.options.length - 1 &&
                                    optKey > 0 &&
                                    optKey < 9
                                  } // we can add a new option in the B one, add up to 10 options
                                  addOption={() => {
                                    setFormTest(
                                      optionCreator(formTest, q_sKey)
                                    );
                                  }}
                                  trashIcon={optKey > 1} // we can delete an option after the B one
                                  deleteOption={() => {
                                    setFormTest(
                                      optionDelete(formTest, q_sKey, optKey)
                                    );
                                  }}
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
              </form>
            </div>
            <div className={styles.createTestPreviewWrapper}>
              <h3>Test Preview</h3>
              <div className={styles.createTestPreview}>
                <Test testData={formTest} />
                <br />
                <br />
                <br />
                <Button size="medium" text="Cancel" type="secondary" />
                <Button size="medium" text="Submit Answers" type="primary" />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default EditTest;
