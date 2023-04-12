import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import GoBackArrow from "@/components/GoBackArrow";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfilePicInput from "@/components/input-components/ProfilePicInput";

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
        mandatory
      />
      <TextInput
        title="Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
      />
      <TextInput
        title="Confirm Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
      />
      {/* if not company */}
      <TextInput
        title="Job Title"
        placeholder="e.g. UX Researcher"
        size="small"
      />
      <TextInput
        title="Location"
        placeholder="e.g. Porto, Portugal"
        size="small"
      />
      <TextInput
        title="Website"
        placeholder="e.g. https://www.usabilityinc.com/"
        size="small"
      />
      <TextInput
        title="Description"
        placeholder="e.g. Our company's mission is to..."
        size="small"
        isTextarea
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
      />
      <TextInput
        title="E-mail"
        placeholder="e.g. user@rocketest.com"
        size="small"
        mandatory
      />
      <TextInput
        title="Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
      />
      <TextInput
        title="Confirm Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
      />
      <TextInput title="Birth Date" placeholder="" type="date" size="small" />

      <TextInput
        title="Gender"
        placeholder=""
        size="small"
        isSelect
        option1="Female"
        option2="Male"
        option3="Other"
      />

      <TextInput
        title="Location"
        placeholder="e.g. Porto, Portugal"
        size="small"
      />
      <TextInput
        title="Career"
        placeholder="e.g. Software Engineer"
        size="small"
      />

      {/* Personal Interests and Helpful Attributes: multi-select */}

      {/* Digital Savviness: question + ratio buttons */}

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
        <title>Rocketest | Sign Up</title>
      </Head>
      <main className={styles.bgColorLight}>
        {userType === "1" ? <SignUpTester /> : <SignUpUxResearcher />}
      </main>
    </>
  );
};

export default SignUp;
