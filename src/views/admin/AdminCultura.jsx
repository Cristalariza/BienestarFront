import { useNavigate } from "react-router-dom";
import ActividadCard from "../../components/admin/card/ActividadCard";
import styles from "../../styles/adminstyles/adminCultura.module.css";

const AdminCultura = () => {
  const navigate = useNavigate();

  const actividadesCulturales = [
    {
      id: 1,
      nombre: "Banda Papayera",
      participantes: 45,
      cuposDisponibles: true,
    },
    {
      id: 2,
      nombre: "Vallenato",
      participantes: 32,
      cuposDisponibles: true,
    },
    {
      id: 3,
      nombre: "Orquesta",
      participantes: 28,
      cuposDisponibles: false,
    },
  ];

  const handleMoreInfo = (nombre) => {
    navigate(`/admin/cultura/${encodeURIComponent(nombre)}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Actividades Culturales</h1>
      <div className={styles.grid}>
        {actividadesCulturales.map((actividad) => (
          <ActividadCard
            key={actividad.id}
            nombre={actividad.nombre}
            participantes={actividad.participantes}
            cuposDisponibles={actividad.cuposDisponibles}
            tipo="cultura"
            onMoreInfo={() => handleMoreInfo(actividad.nombre)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCultura;
