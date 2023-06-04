import Head from "next/head";
import Button from "@/components/Button";
import TextInput from "@/components/input-components/TextInput";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { HobbiesList } from "@/utils/hobbies";
import { CareersList } from "@/utils/careers";
import CheckboxRatioBtnInput from "@/components/input-components/CheckboxRatioBtnInput";
import MultiRangeSlider from "@/components/multi-range-slider/MultiRangeSlider";
import Loading from "@/components/Loading";
import { Form } from "@/utils/testCreatorHelper";
import axios from "axios";
import { userSession } from "@/utils/user";
import { PropsTestPage } from "..";

export interface OptionList {
  value: string;
  label: string;
}

export interface FormCriteria extends Form {
  ageRange: [number, number];
  gender: string;
  location: string;
  careers: string[];
  hobbies: string[];
  digitalSavviness: number[];
  deadlineDate: Date;
  incentiveType: string;
  payment: number;
  privacy: boolean; //public = true
}

const TestDetails = (props: PropsTestPage) => {
  const [digiSavviness, setDigiSavviness] = useState([
    { value: "Not digitally savvy testers.", checked: false },
    { value: "Somewhat digitally savvy testers.", checked: false },
    { value: "Very digitally savvy testers.", checked: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [formTest, setFormTest] = useState({} as FormCriteria);
  const router = useRouter();

  const updateForm = (valueToUpdate: Partial<FormCriteria>) => {
    setFormTest({
      ...formTest,
      ...valueToUpdate,
    });
  };

  const goToEditTestPage = () => {
    router.push("/tests/createTest/editTest");
  };

  const saveTest = async () => {
    // Save Test & Go To Test Details
    const params = {
      userId: props.auth.id,
      formData: formTest,
    };

    await axios
      .post("/api/tests/createTest/insert", params)
      .then(async (res) => {
        sessionStorage.removeItem("currentTest");
        router.push(`/tests/myTests/testDetail/${res.data[0].testId}`);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages defined in the registerTester.tsx file
        } else {
          alert(error.message); // default error message
        }
      });
  };

  useEffect(() => {
    const digitalSavResult = [] as number[];
    digiSavviness.forEach((value, key) => {
      if (value.checked) digitalSavResult.push(key);
    });
    updateForm({ digitalSavviness: digitalSavResult });
  }, [digiSavviness]);

  useEffect(() => {
    const temp = sessionStorage.getItem("currentTest");
    if (temp && router.isReady) {
      setFormTest({
        ...JSON.parse(temp),
        ageRange: [0, 100],
        gender: "-",
        location: "",
        careers: [],
        hobbies: [],
        digitalSavviness: [],
        deadlineDate: new Date(),
        incentiveType: "-",
        payment: 0,
        privacy: true,
      } as FormCriteria);
      setLoading(false);
    } else {
      router.push("/tests/createTest/");
    }
  }, [router]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>Test Details | Rocketest</title>
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
          imageAppears
        />
        <Breadcrumbs
          link="/tests/createTest/testDetails"
          pageName="Test Details"
          activePage
        />
        <h1>Test Details</h1>

        <div className={styles.testDetailsContainer}>
          <div className={styles.leftSide}>
            <h2>Testers&apos; Criteria</h2>
            <img
              src="/icons/test-information.svg"
              alt="Information Icon"
              title="It is not guaranteed that testers will have all these characteristics, but it is important to define them so that you can find the most suitable users for your product."
              className={styles.infoIcon}
            />

            {/* Age Range - Input Range Component */}
            <div className={styles.ageRangeContainer}>
              <label>Age Range</label>
              <MultiRangeSlider
                min={0}
                max={100}
                onChange={({ min, max }) => {
                  console.log(`min = ${min}, max = ${max}`);
                  if (
                    !formTest.ageRange ||
                    formTest.ageRange[0] != min ||
                    formTest.ageRange[1] != max
                  ) {
                    updateForm({ ageRange: [Number(min), Number(max)] });
                  }
                }}
              />
            </div>

            <div className={styles.doubleInputContainer}>
              <TextInput
                title="Gender"
                placeholder=""
                isSelect
                options={["-", "Female Only", "Male Only", "Other"]}
                size="small"
                defaultValue={formTest.gender}
                onChange={(e) => {
                  updateForm({ gender: e.target.value });
                }}
              />
              <TextInput
                title="Location"
                placeholder="e.g. Porto, Portugal"
                size="small"
                defaultValue={formTest.location}
                onChange={(e) => {
                  updateForm({ location: e.target.value });
                }}
              />
            </div>

            {/* Career - Multiselect Component */}
            <span className={styles.inputLabel}>Career</span>
            <Select
              onChange={(e) => {
                const tempArr = [] as string[];
                e?.map((value) => {
                  tempArr.push(value.value);
                });
                updateForm({ careers: tempArr });
              }}
              options={CareersList}
              isMulti
            />

            {/* Personal Interests - Multiselect Component */}
            <span className={styles.inputLabel}>Hobbies</span>
            <Select
              onChange={(e) => {
                const tempArr = [] as string[];
                e?.map((value) => {
                  tempArr.push(value.value);
                });
                updateForm({ hobbies: tempArr });
              }}
              options={HobbiesList}
              isMulti
            />

            {/* Digital Savviness - Checkboxes Input Component */}
            <CheckboxRatioBtnInput
              title="Digital Savviness"
              options={digiSavviness}
              type="checkbox"
              name="digitalSavviness"
              onChange={(e) => {
                const tempDigiSav = [...digiSavviness];
                const index = digiSavviness.findIndex(
                  (d) => d.value === e.target.value
                );
                tempDigiSav[index].checked = tempDigiSav[index].checked
                  ? false
                  : true;
                setDigiSavviness(tempDigiSav);
              }}
            />
          </div>

          <div className={styles.rightSide}>
            <h2>Test&apos;s Information</h2>
            <TextInput
              title="Deadline"
              placeholder=""
              size="large"
              type="date"
              mandatory
              defaultValue={formTest.deadlineDate
                .toISOString()
                .substring(0, 10)}
              onChange={(e) => {
                updateForm({ deadlineDate: new Date(e.target.value) });
              }}
            />

            <div className={styles.doubleInputContainer}>
              <TextInput
                title="Incentive"
                placeholder=""
                size="small"
                type="date"
                mandatory
                isSelect
                defaultValue={formTest.incentiveType}
                options={["-", "Money Transfer", "Amazon Voucher"]}
                onChange={(e) => {
                  updateForm({ incentiveType: e.target.value });
                }}
              />
              <TextInput
                title="Amount (€)"
                placeholder="e.g. 25"
                size="small"
                type="number"
                defaultValue={formTest.payment.toString()}
                isDisabled={
                  !(
                    formTest.incentiveType === "Money Transfer" ||
                    formTest.incentiveType === "Amazon Voucher"
                  )
                }
                onChange={(e) => {
                  updateForm({ payment: Number(e.target.value) });
                }}
              />
            </div>

            {/* Privacy - Ratio Buttons Input Component */}
            <CheckboxRatioBtnInput
              title="Privacy"
              options={[
                {
                  value: "Public",
                  description: "Anyone in Rocketest can access this test",
                  checked: true,
                },
                {
                  value: "Private",
                  description: "Only people with the link can access this test",
                },
              ]}
              type="radio"
              name="privacy"
              onChange={(e) => {
                updateForm({ privacy: e.target.value === "public" });
              }}
              mandatory
            />

            <Button
              text="Back"
              size="large"
              type="secondary"
              function={goToEditTestPage}
            />
            <Button
              text="Save"
              size="large"
              type="primary"
              function={saveTest}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default TestDetails;
