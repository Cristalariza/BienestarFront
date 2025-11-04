import { useNavigate } from "react-router-dom";
import ActividadCard from "../../components/admin/card/ActividadCard";
import styles from "../../styles/adminstyles/adminCultura.module.css";

const AdminDeporte = () => {
  const navigate = useNavigate();

  const actividadesDeportivas = [
    {
      id: 1,
      nombre: "Fútbol",
      participantes: 45,
      cuposDisponibles: true,
    },
    {
      id: 2,
      nombre: "Voleibol",
      participantes: 32,
      cuposDisponibles: true,
    },
    {
      id: 3,
      nombre: "Baloncesto",
      participantes: 28,
      cuposDisponibles: false,
    },
  ];

  const handleMoreInfo = (nombre) => {
    navigate(`/admin/deporte/${encodeURIComponent(nombre)}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Actividades Deportivas</h1>
      <div className={styles.grid}>
        {actividadesDeportivas.map((actividad) => (
          <ActividadCard
            key={actividad.id}
            nombre={actividad.nombre}
            participantes={actividad.participantes}
            cuposDisponibles={actividad.cuposDisponibles}
            tipo="deporte"
            onMoreInfo={() => handleMoreInfo(actividad.nombre)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDeporte;
