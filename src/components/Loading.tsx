import styles from "@/styles/app.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img
        className={styles.loadingSpinner}
        src="/icons/loading.gif"
        alt="Loading spinner"
      />
    </div>
  );
};

export default Loading;
