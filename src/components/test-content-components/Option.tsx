import React, { useState } from "react";
import styles from "@/styles/app.module.css";
import { Option } from "@/utils/testCreatorHelper";
import FullscreenImage from "./FullscreenImage";

interface Props {
  optionValue: string;
  selected?: boolean;
  optionData: Option;
  questionId: number;
  updateOptionAnswer?: (questionId: number, text: string) => void;
}

const OptionEntry = (props: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false); // state to track fullscreen mode
  const [selectedImage, setSelectedImage] = useState(""); // state to store the selected image URL

  return (
    <div className={styles.testImgAndOptionContainer}>
      {/* render the FullscreenImage component when isFullscreen is true */}
      {isFullscreen && (
        <FullscreenImage
          imageUrl={selectedImage}
          closeFullscreen={() => setIsFullscreen(false)}
        />
      )}
      <div className={styles.testImgContainer}>
        <img
          src={props.optionData.imgSrc}
          alt="Option Image"
          onClick={() => {
            setIsFullscreen(true);
            setSelectedImage(props.optionData.imgSrc);
          }}
        />
      </div>
      <div className={styles.testOptionContainer}>
        <input
          type="radio"
          name={props.optionValue}
          checked={props.selected || false}
          value={props.optionData.name}
          onChange={(e) => {
            props.updateOptionAnswer &&
              props.updateOptionAnswer(props.questionId, e.target.value);
          }}
        />
        <label>{props.optionData.name}</label>
      </div>
    </div>
  );
};

export default OptionEntry;
