import React from "react";
import styles from "@/styles/app.module.css";

interface FullscreenImageProps {
  imageUrl: string;
  closeFullscreen: () => void;
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({
  imageUrl,
  closeFullscreen,
}) => {
  return (
    <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
      <img src={imageUrl} alt="Fullscreen Image" />
    </div>
  );
};

export default FullscreenImage;
