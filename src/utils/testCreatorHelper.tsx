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
const imgSrcExample =
  "data:image/png;base64,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";
const imgNameExample = "Testimg.png";

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
          imgSrc: imgSrcExample,
          imgName: imgNameExample,
        },
        {
          id: 1,
          name: "Q1O2",
          imgSrc: imgSrcExample,
          imgName: imgNameExample,
        },
      ],
      answer: "",
      isSection: false,
    },
    {
      id: 2,
      name: "Q2",
      options: [
        {
          id: 0,
          name: "Q2O1",
          imgSrc: imgSrcExample,
          imgName: imgNameExample,
        },
        {
          id: 1,
          name: "Q2O2",
          imgSrc: imgSrcExample,
          imgName: imgNameExample,
        },
        {
          id: 2,
          name: "Q2O3",
          imgSrc: imgSrcExample,
          imgName: imgNameExample,
        },
      ],
      answer: "",
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
export const optionCreator = (formObj: Form, questionId: number): Form => {
  const updatedFormObj = { ...formObj };

  if (
    (updatedFormObj.question_section[questionId] as Question).options.length >=
    10
  ) {
    alert(
      "Maximum number of options reached. Please add only up to 10 options."
    );
  } else {
    // push a new option to the options array of the specified question
    (updatedFormObj.question_section[questionId] as Question).options.push(
      optionTemplate(
        (updatedFormObj.question_section[questionId] as Question).options.length
      )
    );
  }

  return updatedFormObj;
};

export const optionDelete = (
  formObj: Form,
  questionId: number,
  optionId: number
): Form => {
  const updatedFormObj = { ...formObj };

  // delete the specified option from the question array of the form
  (updatedFormObj.question_section[questionId] as Question).options.splice(
    optionId,
    1
  );

  return updatedFormObj;
};

export const question_sectionCreator = (
  formObj: Form,
  isSection: boolean
): Form => {
  const updatedFormObj = { ...formObj };

  if (
    updatedFormObj.question_section[formObj.question_section.length - 1]
      .isSection
  ) {
    alert("You cannot have 2 sections after one another!");
  } else {
    // create a new question or section and add it to the question_section array of the form
    updatedFormObj.question_section.push(
      question_sectionTemplate(formObj.question_section.length, isSection)
    );
  }

  return updatedFormObj;
};

export const question_sectionDelete = (
  formObj: Form,
  question_sectionId: number
): Form => {
  const updatedFormObj = { ...formObj };

  if (
    confirm(
      "Are you sure you want to delete this Question/Section? All of its contents will be lost."
    )
  ) {
    // delete the specified question or section from the question_section array of the form
    updatedFormObj.question_section.splice(question_sectionId, 1);
  }

  return updatedFormObj;
};

// onChange Text ----------------------------------------------------------------------------------
export const updateNameQuestionSection = (
  formObj: Form,
  question_sectionId: number,
  text: string
): Form => {
  const updatedFormObj = { ...formObj };

  updatedFormObj.question_section[question_sectionId].name = text;

  return updatedFormObj;
};

export const updateDescriptionSection = (
  formObj: Form,
  sectionId: number,
  text: string
): Form => {
  const updatedFormObj = { ...formObj };

  (updatedFormObj.question_section[sectionId] as Section).description = text;

  return updatedFormObj;
};

export const updateTextOption = (
  formObj: Form,
  questionId: number,
  optionId: number,
  text: string
): Form => {
  const updatedFormObj = { ...formObj };

  (updatedFormObj.question_section[questionId] as Question).options[
    optionId
  ].name = text;

  return updatedFormObj;
};

export const updateImageOption = (
  formObj: Form,
  questionId: number,
  optionId: number,
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

      (updatedFormObj.question_section[questionId] as Question).options[
        optionId
      ].imgSrc = dataURL;
      (updatedFormObj.question_section[questionId] as Question).options[
        optionId
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
  questionId: number,
  optionId: number
): Form => {
  const updatedFormObj = { ...formObj };

  // deletes the uploaded file from the form
  (updatedFormObj.question_section[questionId] as Question).options[
    optionId
  ].imgSrc = "";
  (updatedFormObj.question_section[questionId] as Question).options[
    optionId
  ].imgName = "";

  return updatedFormObj;
};
