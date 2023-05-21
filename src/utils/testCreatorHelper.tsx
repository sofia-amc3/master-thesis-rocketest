// main form interfaces
interface Option {
  id: number;
  name: string;
  imgSrc: string;
}

interface Question {
  id: number;
  name: string;
  options: Option[];
  isSection: false;
}

interface Section {
  id: number;
  name: string;
  description: string;
  isSection: true;
}

interface Form {
  testName: string;
  testType: string;
  testCreator: string;
  testDescription: string;
  question_section: (Question | Section)[];
}

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
      } as Section)
    : ({
        id: id,
        name: "",
        options: [optionTemplate(0), optionTemplate(1)],
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
export const optionCreator = (
  formObj: Form,
  question_section: Question
): Form => {
  (formObj.question_section[question_section.id] as Question).options.push(
    optionTemplate(question_section.options.length)
  );

  return formObj;
};

export const question_sectionCreator = (
  formObj: Form,
  isSection: boolean
): Form => {
  formObj.question_section.push(
    question_sectionTemplate(formObj.question_section.length, isSection)
  );

  return formObj;
};

// updateTextQuestion(formObj, q_s, text)
//       formObj.question_section[q_s.id].name = text

// updateTextOption(formObj, q_s, opt, text)
//       formObj.question_section[q_s.id].options[opt.id].name = text
