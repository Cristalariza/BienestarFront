import PropTypes from "prop-types";
import styles from "../../../styles/shared/gradientBar.module.css";

const GradientBar = ({ text }) => {
  return (
    <div className={styles.gradientBar}>
      {text && <h2 className={styles.headerTitle}>{text}</h2>}
    </div>
  );
};

GradientBar.propTypes = {
  text: PropTypes.string,
};

export default GradientBar;
