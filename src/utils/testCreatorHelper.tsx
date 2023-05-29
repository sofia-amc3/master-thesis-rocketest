// main form interfaces
interface Option {
  id: number;
  name: string;
  imgSrc: string;
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

// example object
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
        },
        {
          id: 1,
          name: "Q1O2",
          imgSrc: "",
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
        },
        {
          id: 1,
          name: "Q2O2",
          imgSrc: "",
        },
        {
          id: 2,
          name: "Q2O3",
          imgSrc: "",
        },
      ],
      isSection: false,
    },
  ],
} as Form;

// base variables and helper methods
const optionTemplate = (id: number): Option => {
  return {
    id: id,
    name: "",
    imgSrc: "",
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

// creators
export const optionCreator = (formObj: Form, q_s: Question): Form => {
  // push a new option to the options array of the specified question
  (formObj.question_section[q_s.id] as Question).options.push(
    optionTemplate(q_s.options.length)
  );

  return formObj;
};

export const question_sectionCreator = (
  formObj: Form,
  isSection: boolean
): Form => {
  // create a new question or section and add it to the question_section array of the form
  formObj.question_section.push(
    question_sectionTemplate(formObj.question_section.length, isSection)
  );

  console.log("newform", formObj);

  return formObj;
};

export const question_sectionDelete = (
  formObj: Form,
  q_s: Question | Section
): Form => {
  // delete the specified question or section from the question_section array of the form
  formObj.question_section.splice(formObj.question_section.indexOf(q_s), 1);

  console.log("newform", formObj, q_s);

  return formObj;
};

// onChange Text
// updateTextQuestion(formObj, q_s, text)
//       formObj.question_section[q_s.id].name = text

// updateTextOption(formObj, q_s, opt, text)
//       formObj.question_section[q_s.id].options[opt.id].name = text
