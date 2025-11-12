import React from "react";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.css";

const StatCard = ({
  title,
  value,
  icon,
  color = "primary",
  subtitle,
  trend,
}) => {
  return (
    <div className={`${styles.statCard} ${styles[`statCard--${color}`]}`}>
      <div className={styles.statCard__header}>
        <div className={styles.statCard__iconWrapper}>
          <i className={`pi ${icon} ${styles.statCard__icon}`}></i>
        </div>
        <div className={styles.statCard__info}>
          <h3 className={styles.statCard__title}>{title}</h3>
          <div className={styles.statCard__value}>{value}</div>
          {subtitle && <p className={styles.statCard__subtitle}>{subtitle}</p>}
        </div>
      </div>
      {trend && (
        <div className={styles.statCard__trend}>
          <i
            className={`pi ${
              trend.isPositive ? "pi-arrow-up" : "pi-arrow-down"
            } ${styles.statCard__trendIcon} ${
              trend.isPositive
                ? styles["statCard__trendIcon--positive"]
                : styles["statCard__trendIcon--negative"]
            }`}
          ></i>
          <span className={styles.statCard__trendText}>{trend.value}%</span>
          <span className={styles.statCard__trendPeriod}>{trend.period}</span>
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["primary", "success", "warning", "info", "danger"]),
  subtitle: PropTypes.string,
  trend: PropTypes.shape({
    value: PropTypes.number,
    isPositive: PropTypes.bool,
    period: PropTypes.string,
  }),
};

export default StatCard;
