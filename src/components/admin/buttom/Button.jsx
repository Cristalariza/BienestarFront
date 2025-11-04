import PropTypes from "prop-types";
import styles from "../../../styles/adminstyles/button.module.css";

const Button = ({ label, variant, icon, iconPos, onClick, disabled, type }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "success":
        return styles.success;
      case "outline":
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${getVariantClass()}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPos === "left" && (
        <i className={`${icon} ${styles.icon}`}></i>
      )}
      {label && <span>{label}</span>}
      {icon && iconPos === "right" && (
        <i className={`${icon} ${styles.icon}`}></i>
      )}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "outline"]),
  icon: PropTypes.string,
  iconPos: PropTypes.oneOf(["left", "right"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  iconPos: "left",
  onClick: () => {},
  disabled: false,
  type: "button",
};

export default Button;
