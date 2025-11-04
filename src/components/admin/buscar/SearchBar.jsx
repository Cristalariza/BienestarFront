import PropTypes from "prop-types";
import styles from "../../../styles/adminstyles/searchBar.module.css";

const SearchBar = ({ placeholder, value, onChange, onClear }) => {
  return (
    <div className={styles.searchContainer}>
      <i className="pi pi-search"></i>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clearButton} onClick={onClear}>
          <i className="pi pi-times"></i>
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};

SearchBar.defaultProps = {
  placeholder: "Buscar por nombre, código o programa...",
  onClear: () => {},
};

export default SearchBar;
