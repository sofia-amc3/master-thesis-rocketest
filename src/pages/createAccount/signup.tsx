import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import GoBackArrow from "@/components/GoBackArrow";
import ProfilePicInput from "@/components/input-components/ProfilePicInput";
import Select from "react-select";
import { HobbiesList } from "@/utils/hobbies";
import CheckboxRatioBtnInput from "@/components/input-components/CheckboxRatioBtnInput";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { userSession } from "@/utils/user";

export interface OptionList {
  value: string;
  label: string;
}
interface FormDataUxResearcher {
  name: string;
  isCompany: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  jobTitle: string;
  location: string;
  website: string;
  description: string;
  profilePhoto?: string;
  imgDetails?: string;
}

const SignUpUxResearcher = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormDataUxResearcher>({
    name: "",
    isCompany: false,
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    location: "",
    website: "",
    description: "",
    profilePhoto: "",
    imgDetails: "",
  });

  const updateForm = (valueToUpdate: Partial<FormDataUxResearcher>) => {
    setForm({
      ...form,
      ...valueToUpdate,
    });
  };

  // Profile Picture Input
  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // get uploaded file
    const file = event.target.files?.[0];

    if (file) {
      // checks if the file size is too large (size is in bytes)
      if (file.size > 1500000) {
        alert("File too large");
        return;
      }

      // creates a FileReader object to read the file
      const reader = new FileReader();

      reader.onload = (e) => {
        // extract the data URL from the FileReader result
        const dataURL = e.target?.result as string; // base64encoded string
        setForm((prevForm) => ({
          ...prevForm,
          profilePhoto: dataURL,
          imgDetails: file.name,
        }));
      };

      reader.onerror = (error) => {
        console.log("Error: ", error);
      };

      // reads the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicDelete = () => {
    // deletes the uploaded file from the form
    setForm((prevForm) => ({
      ...prevForm,
      profilePhoto: "", // resets the profilePhoto state
      imgDetails: "", // resets the imgDetails state
    }));
  };

  // Terms and Conditions Checkbox
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Registry Process
  const handleRegisterUxR = async () => {
    // validations
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
    } else if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("All mandatory fields must be provided.");
    } else if (!isChecked) {
      alert("Please accept the Terms and Conditions.");
    } else {
      // all validations were successful
      await axios
        .post("/api/user/registerUxResearcher", form)
        .then(async (res) => {
          await userSession.setItem(JSON.stringify(res.data), false); // 'remember me' value is false by default
          router.push("/tests");
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            alert(error.response.data.message); // specific error messages
          } else {
            alert(JSON.stringify(error.response.data)); // default error message
          }
        });
    }
  };

  return (
    <div className={styles.authContainer}>
      <GoBackArrow />

      <h1>Create an Account</h1>
      <h4>Sign up by entering the information below.</h4>

      {form.isCompany ? (
        <TextInput
          title="Company Name"
          placeholder="e.g. Usability Inc."
          size="small"
          mandatory
          onChange={(e) => {
            updateForm({ name: e.target.value });
          }}
        />
      ) : (
        <TextInput
          title="Name"
          placeholder="e.g. John Smith"
          size="small"
          mandatory
          onChange={(e) => {
            updateForm({ name: e.target.value });
          }}
        />
      )}
      <div
        className={`${styles.checkboxContainer} ${styles.checkboxCompanyContainer}`}
      >
        <input
          type="checkbox"
          name="isCompany"
          value="isCompany"
          onChange={(e) => updateForm({ isCompany: e.target.checked })}
          checked={form.isCompany}
        />
        <label>Company</label>
      </div>
      <TextInput
        title="E-mail"
        placeholder="e.g. user@rocketest.com"
        size="small"
        mandatory
        onChange={(e) => {
          updateForm({ email: e.target.value });
        }}
      />
      <TextInput
        title="Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          updateForm({ password: e.target.value });
        }}
      />
      <img
        src="/icons/test-information.svg"
        alt="Information Icon"
        title="Password must have at least 8 characters, one uppercase letter, one special character, and one number."
        className={`${styles.infoIcon} ${styles.registerInfoIcon}`}
      />
      <TextInput
        title="Confirm Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          updateForm({ confirmPassword: e.target.value });
        }}
      />
      {/* if not company */}
      {!form.isCompany && (
        <TextInput
          title="Job Title"
          placeholder="e.g. UX Researcher"
          size="small"
          onChange={(e) => {
            updateForm({ jobTitle: e.target.value });
          }}
        />
      )}
      <TextInput
        title="Location"
        placeholder="e.g. Porto, Portugal"
        size="small"
        onChange={(e) => {
          updateForm({ location: e.target.value });
        }}
      />
      <TextInput
        title="Website"
        placeholder="e.g. https://www.usabilityinc.com/"
        size="small"
        onChange={(e) => {
          updateForm({ website: e.target.value });
        }}
      />
      <TextInput
        title="Description"
        placeholder="e.g. Our company's mission is to..."
        size="small"
        isTextarea
        onChange={(e) => {
          updateForm({ description: e.target.value });
        }}
        textareaMaxLength={1000}
      />

      {/* PROFILE PHOTO INPUT */}
      <ProfilePicInput
        title="Profile Picture"
        src={form.profilePhoto || ""}
        imgDetails={form.imgDetails || ""}
        onChange={handleProfilePicChange}
        onDelete={handleProfilePicDelete}
      />

      <div className={styles.checkboxTAndCGeneral}>
        <div
          className={`${styles.checkboxContainer} ${styles.checkboxTandCContainer}`}
        >
          {/* Must be checked before registering */}
          <input
            type="checkbox"
            name="termsAndConditions"
            value="termsAndConditions"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label>I have read and accept the</label>
        </div>
        <Link href="/termsAndConditions">
          Terms and Conditions<span>*</span>
        </Link>
      </div>

      <Button
        text="Sign Up"
        type="primary"
        size="extra-large"
        function={handleRegisterUxR}
      />

      <span>Already have an account?</span>
      <Link href="/">Login</Link>
    </div>
  );
};

//
// ---------------------------------------------------------------------
//

interface FormDataTester {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  gender: string;
  location: string;
  jobTitle: string;
  hobbies: string[];
  digitalSavviness1: string;
  digitalSavviness2: string;
  digitalSavvinessGeneral: number;
  profilePhoto?: string;
  imgDetails?: string;
}

const SignUpTester = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormDataTester>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: new Date("2000"),
    gender: "Female",
    location: "",
    jobTitle: "",
    hobbies: [],
    digitalSavviness1: "",
    digitalSavviness2: "",
    digitalSavvinessGeneral: 1,
    profilePhoto: "",
    imgDetails: "",
  });

  // Digital Savviness Assessment
  /* The Pew classification categories are:
      - Very digitally savvy: Those who use the internet more than once a day and are very confident.
      - Not digitally savvy: Those who use the internet less than once a day and are not very confident.
      - Somewhat digitally savvy: All others. */
  const digitalSavvinessUpdate = () => {
    if (
      form.digitalSavviness2 === "Very confident" &&
      (form.digitalSavviness1 === "Multiple times a day" ||
        form.digitalSavviness1 === "Most of the day")
    ) {
      setForm({
        ...form,
        digitalSavvinessGeneral: 2,
      });
    } else if (
      form.digitalSavviness2 === "Not at all confident" &&
      (form.digitalSavviness1 === "Never" ||
        form.digitalSavviness1 === "Less than once a week" ||
        form.digitalSavviness1 === "Once a week" ||
        form.digitalSavviness1 === "Several times a week")
    ) {
      setForm({
        ...form,
        digitalSavvinessGeneral: 0,
      });
    } else {
      setForm({
        ...form,
        digitalSavvinessGeneral: 1,
      });
    }
  };
  useEffect(() => {
    digitalSavvinessUpdate();
  }, [form.digitalSavviness1, form.digitalSavviness2]);

  const updateForm = (valueToUpdate: Partial<FormDataTester>) => {
    setForm({
      ...form,
      ...valueToUpdate,
    });
  };

  // Profile Pic Input
  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // get uploaded file
    const file = event.target.files?.[0];

    if (file) {
      // checks if the file size is too large (size is in bytes)
      if (file.size > 1500000) {
        alert("File too large");
        return;
      }

      // creates a FileReader object to read the file
      const reader = new FileReader();

      reader.onload = (e) => {
        // extract the data URL from the FileReader result
        const dataURL = e.target?.result as string; // base64encoded string
        setForm((prevForm) => ({
          ...prevForm,
          profilePhoto: dataURL,
          imgDetails: file.name,
        }));
      };

      reader.onerror = (error) => {
        console.log("Error: ", error);
      };

      // reads the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicDelete = () => {
    // deletes the uploaded file from the form
    setForm((prevForm) => ({
      ...prevForm,
      profilePhoto: "", // resets the profilePhoto state
      imgDetails: "", // resets the imgDetails state
    }));
  };

  // Checkbox Terms and Conditions
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Registry Process
  const handleRegisterTester = async () => {
    // validations
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
    } else if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("All mandatory fields must be provided.");
    } else if (!isChecked) {
      alert("Please accept the Terms and Conditions.");
    } else {
      // all validations were successful
      await axios
        .post("/api/user/registerTester", form)
        .then(async (res) => {
          await userSession.setItem(JSON.stringify(res.data), false); // 'remember me' value is false by default
          router.push("/tests");
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            alert(error.response.data.message); // specific error messages
          } else {
            alert(JSON.stringify(error.response.data)); // default error message
          }
        });
    }
  };

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
          updateForm({ name: e.target.value });
        }}
      />

      <TextInput
        title="E-mail"
        placeholder="e.g. user@rocketest.com"
        size="small"
        mandatory
        onChange={(e) => {
          updateForm({ email: e.target.value });
        }}
      />

      <TextInput
        title="Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          updateForm({ password: e.target.value });
        }}
      />
      <img
        src="/icons/test-information.svg"
        alt="Information Icon"
        title="Password must have at least 8 characters, one uppercase letter, one special character, and one number."
        className={`${styles.infoIcon} ${styles.registerInfoIconTester}`}
      />

      <TextInput
        title="Confirm Password"
        placeholder=""
        type="password"
        size="small"
        mandatory
        onChange={(e) => {
          updateForm({ confirmPassword: e.target.value });
        }}
      />

      <TextInput
        title="Birth Date"
        placeholder=""
        type="date"
        size="small"
        onChange={(e) => {
          updateForm({ birthDate: new Date(e.target.value) });
        }}
      />

      <TextInput
        title="Gender"
        placeholder=""
        size="small"
        isSelect
        defaultValue={form.gender}
        options={["Other", "Female", "Male"]}
        onChange={(e) => {
          updateForm({ gender: e.target.value });
        }}
      />

      <TextInput
        title="Location"
        placeholder="e.g. Porto, Portugal"
        size="small"
        onChange={(e) => {
          updateForm({ location: e.target.value });
        }}
      />

      <TextInput
        title="Career"
        placeholder="e.g. Software Engineer"
        size="small"
        onChange={(e) => {
          updateForm({ jobTitle: e.target.value });
        }}
      />

      {/* Hobbies: MultiSelect Component */}
      <label className={styles.inputLabel}>Hobbies</label>
      <Select
        onChange={(fullList) => {
          const tempHobbies = [] as string[];

          fullList.map((hobby, key) => {
            tempHobbies.push(hobby.value);
          });

          updateForm({ hobbies: tempHobbies });
        }}
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
            updateForm({ digitalSavviness1: e.target.value });
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
            updateForm({ digitalSavviness2: e.target.value });
          }}
        />
      </div>

      <ProfilePicInput
        title="Profile Picture"
        src={form.profilePhoto || ""}
        imgDetails={form.imgDetails || ""}
        onChange={handleProfilePicChange}
        onDelete={handleProfilePicDelete}
      />

      <div className={styles.checkboxTAndCGeneral}>
        <div
          className={`${styles.checkboxContainer} ${styles.checkboxTandCContainer}`}
        >
          {/* Must be checked before registering */}
          <input
            type="checkbox"
            name="termsAndConditions"
            value="termsAndConditions"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label>I have read and accept the</label>
        </div>
        <Link href="/termsAndConditions">
          Terms and Conditions<span>*</span>
        </Link>
      </div>

      <Button
        text="Sign Up"
        type="primary"
        size="extra-large"
        function={handleRegisterTester}
      />

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
