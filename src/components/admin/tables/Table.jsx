import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/adminstyles/table.module.css";

const Table = ({ columns, data, onPageChange, currentPage, totalPages }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getCellClassName = (column, value) => {
    if (column.key === "carrera") {
      return styles.carreraBadge;
    }
    if (column.key === "asistencia") {
      return styles.asistencia;
    }
    return "";
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={column.sortable ? styles.sortable : ""}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}
                  {column.sortable && sortColumn === column.key && (
                    <i
                      className={`pi ${
                        sortDirection === "asc" ? "pi-sort-up" : "pi-sort-down"
                      } ${styles.sortIcon}`}
                    ></i>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        <span
                          className={getCellClassName(column, row[column.key])}
                        >
                          {row[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '3rem' }}>
                  <i className="pi pi-info-circle" style={{ fontSize: '3rem', color: '#6b7280' }}></i>
                  <p style={{ color: '#6b7280', marginTop: '1rem' }}>
                    No hay inscripciones registradas.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="pi pi-chevron-left"></i>
          </button>
          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="pi pi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

Table.defaultProps = {
  onPageChange: () => {},
  currentPage: 1,
  totalPages: 1,
};

export default Table;
