import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import GoBackArrow from "@/components/GoBackArrow";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProfilePicInput from "@/components/input-components/ProfilePicInput";
import Select from "react-select";
import { HobbiesList } from "@/utils/hobbies";
import CheckboxRatioBtnInput from "@/components/input-components/CheckboxRatioBtnInput";

export interface OptionList {
  value: string;
  label: string;
}

const SignUpUxResearcher = () => {
  return (
    <div className={styles.authContainer}>
      <GoBackArrow />

      <h1>Create an Account</h1>
      <h4>Sign up by entering the information below.</h4>

      <TextInput
        title="Company Name"
        placeholder="e.g. Usability Inc."
        size="small"
        mandatory
        onChange={(e) => {
          console.log("Company Name", e.target.value);
        }}
      />
      <div
        className={`${styles.checkboxContainer} ${styles.checkboxCompanyContainer}`}
      >
        <input type="checkbox" name="isCompany" value="isCompany" />
        <label>Company</label>
      </div>
      <TextInput
        title="E-mail"
        placeholder="e.g. user@rocketest.com"
        size="small"
        onChange={(e) => {
          console.log("E-mail", e.target.value);
        }}
      />
      <TextInput
        title="Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          console.log("Password", e.target.value);
        }}
      />
      <TextInput
        title="Confirm Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          console.log("Confirm Password", e.target.value);
        }}
      />
      {/* if not company */}
      <TextInput
        title="Job Title"
        placeholder="e.g. UX Researcher"
        size="small"
        onChange={(e) => {
          console.log("Job Title", e.target.value);
        }}
      />
      <TextInput
        title="Location"
        placeholder="e.g. Porto, Portugal"
        size="small"
        onChange={(e) => {
          console.log("Location", e.target.value);
        }}
      />
      <TextInput
        title="Website"
        placeholder="e.g. https://www.usabilityinc.com/"
        size="small"
        onChange={(e) => {
          console.log("Website", e.target.value);
        }}
      />
      <TextInput
        title="Description"
        placeholder="e.g. Our company's mission is to..."
        size="small"
        isTextarea
        onChange={(e) => {
          console.log("Description", e.target.value);
        }}
      />

      {/* PROFILE PHOTO INPUT */}
      <ProfilePicInput
        title="Profile Picture"
        src=""
        imgDetails="picture.jpg"
      />

      <div className={styles.checkboxTAndCGeneral}>
        <div
          className={`${styles.checkboxContainer} ${styles.checkboxTandCContainer}`}
        >
          <input
            type="checkbox"
            name="termsAndConditions"
            value="termsAndConditions"
          />
          <label>I have read and accept the</label>
        </div>
        <Link href="/termsAndConditions">Terms and Conditions</Link>
      </div>

      <Button text="Sign Up" type="primary" size="extra-large" />

      <span>Already have an account?</span>
      <Link href="/">Login</Link>
    </div>
  );
};

const SignUpTester = () => {
  const [selectedOption, setSelectedOption] = useState<
    null | readonly OptionList[]
  >(null);

  return (
    <div className={styles.authContainer}>
      <GoBackArrow />

      <h1>Create an Account</h1>
      <h4>Sign up by entering the information below.</h4>

      <TextInput
        title="Name"
        placeholder="e.g. John Smith"
        size="small"
        mandatory
        onChange={(e) => {
          console.log("Name", e.target.value);
        }}
      />

      <TextInput
        title="E-mail"
        placeholder="e.g. user@rocketest.com"
        size="small"
        mandatory
        onChange={(e) => {
          console.log("E-mail", e.target.value);
        }}
      />

      <TextInput
        title="Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          console.log("Password", e.target.value);
        }}
      />

      <TextInput
        title="Confirm Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          console.log("Confirm Password", e.target.value);
        }}
      />

      <TextInput
        title="Birth Date"
        placeholder=""
        type="date"
        size="small"
        onChange={(e) => {
          console.log("Birth Date", e.target.value);
        }}
      />

      <TextInput
        title="Gender"
        placeholder=""
        size="small"
        isSelect
        options={["Female", "Male", "Other"]}
        onChange={(e) => {
          console.log("gender", e.target.value);
        }}
      />

      <TextInput
        title="Location"
        placeholder="e.g. Porto, Portugal"
        size="small"
        onChange={(e) => {
          console.log("Location", e.target.value);
        }}
      />
      <TextInput
        title="Career"
        placeholder="e.g. Software Engineer"
        size="small"
        onChange={(e) => {
          console.log("Career", e.target.value);
        }}
      />

      {/* Hobbies: MultiSelect Component */}
      <label className={styles.inputLabel}>Hobbies</label>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={HobbiesList}
        isMulti
      />

      {/* Digital Savviness: Ratio Buttons with Questions */}
      <label className={styles.digitalSav}>Digital Savviness Assessment</label>
      <div className={styles.digitalSavAssessment}>
        <CheckboxRatioBtnInput
          title="Overall, how often do you use the internet?"
          options={[
            { value: "Never" },
            { value: "Less than once a week" },
            { value: "Once a week" },
            { value: "Several times a week" },
            { value: "At least once a day" },
            { value: "Multiple times a day" },
            { value: "Most of the day" },
          ]}
          type="radio"
          name="digitalSavvinessQ1"
          onChange={(e) => {
            console.log("Digital Savviness Question 01", e.target.checked);
          }}
        />
        <CheckboxRatioBtnInput
          title="Overall, how confident do you feel using computers, smartphones, or other electronic devices to do the things you need to do online?"
          options={[
            { value: "Not at all confident" },
            { value: "Only a little confident" },
            { value: "Somewhat confident" },
            { value: "Very confident" },
          ]}
          type="radio"
          name="digitalSavvinessQ2"
          onChange={(e) => {
            console.log("Digital Savviness Question 02", e.target.checked);
          }}
        />
      </div>

      {/* PROFILE PHOTO INPUT */}
      <ProfilePicInput
        title="Profile Picture"
        src=""
        imgDetails="picture.jpg"
      />

      <div className={styles.checkboxTAndCGeneral}>
        <div
          className={`${styles.checkboxContainer} ${styles.checkboxTandCContainer}`}
        >
          <input
            type="checkbox"
            name="termsAndConditions"
            value="termsAndConditions"
          />
          <label>I have read and accept the</label>
        </div>
        <Link href="/termsAndConditions">Terms and Conditions</Link>
      </div>

      <Button text="Sign Up" type="primary" size="extra-large" />

      <span>Already have an account?</span>
      <Link href="/">Login</Link>
    </div>
  );
};

const SignUp = () => {
  const router = useRouter();
  const [userType, setUserType] = useState(""); // 0 = ux researcher, 1 = tester

  useEffect(() => {
    const temp_userType = router.query.userType as string;

    if (temp_userType === undefined || temp_userType === "") {
      router.push({ pathname: "/createAccount" });
    }
    setUserType(temp_userType);
  }, []);

  return (
    <>
      <Head>
        <title>Sign Up | Rocketest</title>
      </Head>
      <main className={styles.bgColorLight}>
        {userType === "1" ? <SignUpTester /> : <SignUpUxResearcher />}
      </main>
    </>
  );
};

export default SignUp;
