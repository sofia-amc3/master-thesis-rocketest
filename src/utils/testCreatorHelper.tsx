// main form interfaces ----------------------------------------------------------------------------------
export interface Option {
  id: number;
  name: string;
  imgSrc: string;
  imgName: string;
}

export interface Question {
  id: number;
  name: string;
  options: Option[];
  isSection: false;
}

export interface Section {
  id: number;
  name: string;
  description: string;
  isSection: true;
}

export interface Form {
  testName: string;
  testType: string;
  testCreator: string;
  testDescription: string;
  question_section: (Question | Section)[];
}

// example object --------------------------------------------------------------------------------------
export const exampleFormObject = {
  testName: "AB TEST_TEST",
  testType: "EXAMPLE_TEST",
  testCreator: "CREATOR_TEST",
  testDescription: "DESCRIPTION_TEST",
  question_section: [
    {
      id: 0,
      name: "SECT1",
      description: "",
      isSection: true,
    },
    {
      id: 1,
      name: "Q1",
      options: [
        {
          id: 0,
          name: "Q1O1",
          imgSrc: "",
          imgName: "",
        },
        {
          id: 1,
          name: "Q1O2",
          imgSrc: "",
          imgName: "",
        },
      ],
      isSection: false,
    },
    {
      id: 2,
      name: "Q2",
      options: [
        {
          id: 0,
          name: "Q2O1",
          imgSrc: "",
          imgName: "",
        },
        {
          id: 1,
          name: "Q2O2",
          imgSrc: "",
          imgName: "",
        },
        {
          id: 2,
          name: "Q2O3",
          imgSrc: "",
          imgName: "",
        },
      ],
      isSection: false,
    },
  ],
} as Form;

// base variables and helper methods --------------------------------------------------------------------
const optionTemplate = (id: number): Option => {
  return {
    id: id,
    name: "",
    imgSrc: "",
    imgName: "",
  } as Option;
};

const question_sectionTemplate = (
  id: number,
  isSection: boolean
): Section | Question => {
  return isSection
    ? ({
        id: id,
        name: "",
        description: "",
        isSection: true,
      } as Section)
    : ({
        id: id,
        name: "",
        options: [optionTemplate(0), optionTemplate(1)],
        isSection: false,
      } as Question);
};

export const formTemplate = {
  testName: "",
  testType: "",
  testCreator: "",
  testDescription: "",
  question_section: [],
} as Form;

// creators ---------------------------------------------------------------------------------------
export const optionCreator = (formObj: Form, q_s: Question): Form => {
  const updatedFormObj = { ...formObj };

  // push a new option to the options array of the specified question
  (updatedFormObj.question_section[q_s.id] as Question).options.push(
    optionTemplate(q_s.options.length)
  );

  return updatedFormObj;
};

export const optionDelete = (
  formObj: Form,
  q_s: Question,
  opt: Option
): Form => {
  const updatedFormObj = { ...formObj };

  // delete the specified option from the question array of the form
  (updatedFormObj.question_section[q_s.id] as Question).options.splice(
    q_s.options.indexOf(opt),
    1
  );

  return updatedFormObj;
};

export const question_sectionCreator = (
  formObj: Form,
  isSection: boolean
): Form => {
  const updatedFormObj = { ...formObj };

  // create a new question or section and add it to the question_section array of the form
  updatedFormObj.question_section.push(
    question_sectionTemplate(formObj.question_section.length, isSection)
  );

  return updatedFormObj;
};

export const question_sectionDelete = (
  formObj: Form,
  q_s: Question | Section
): Form => {
  const updatedFormObj = { ...formObj };

  // delete the specified question or section from the question_section array of the form
  updatedFormObj.question_section.splice(
    formObj.question_section.indexOf(q_s),
    1
  );

  return updatedFormObj;
};

// onChange Text ----------------------------------------------------------------------------------
export const updateNameQuestionSection = (
  formObj: Form,
  q_s: Question | Section,
  text: string
): Form => {
  const updatedFormObj = { ...formObj };

  updatedFormObj.question_section[q_s.id].name = text;

  return updatedFormObj;
};

export const updateDescriptionSection = (
  formObj: Form,
  q_s: Section,
  text: string
): Form => {
  const updatedFormObj = { ...formObj };

  (updatedFormObj.question_section[q_s.id] as Section).description = text;

  return updatedFormObj;
};

export const updateTextOption = (
  formObj: Form,
  q_s: Question,
  opt: Option,
  text: string
): Form => {
  const updatedFormObj = { ...formObj };

  (updatedFormObj.question_section[q_s.id] as Question).options[opt.id].name =
    text;

  return updatedFormObj;
};

export const updateImageOption = (
  formObj: Form,
  q_s: Question,
  opt: Option,
  event: React.ChangeEvent<HTMLInputElement>
): Form => {
  // get uploaded file
  const file = event.target.files?.[0];

  if (file) {
    // checks if the file size is too large (size is in bytes)
    if (file.size > 1200000) {
      alert("File too large");
      return formObj;
    }

    // creates a FileReader object to read the file
    const reader = new FileReader();

    const updatedFormObj = { ...formObj };

    reader.onload = (e) => {
      // extract the data URL from the FileReader result
      const dataURL = e.target?.result as string; // base64encoded string

      (updatedFormObj.question_section[q_s.id] as Question).options[
        opt.id
      ].imgSrc = dataURL;
      (updatedFormObj.question_section[q_s.id] as Question).options[
        opt.id
      ].imgName = file.name;
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };

    // reads the file as a data URL
    reader.readAsDataURL(file);

    return updatedFormObj;
  }

  return formObj;
};

export const deleteImageOption = (
  formObj: Form,
  q_s: Question,
  opt: Option
): Form => {
  const updatedFormObj = { ...formObj };

  // deletes the uploaded file from the form
  (updatedFormObj.question_section[q_s.id] as Question).options[opt.id].imgSrc =
    "";
  (updatedFormObj.question_section[q_s.id] as Question).options[
    opt.id
  ].imgName = "";

  return updatedFormObj;
};
