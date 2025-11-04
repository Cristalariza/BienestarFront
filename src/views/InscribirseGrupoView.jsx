import React, { useState, useRef } from "react";
import styles from "../styles/InscribirseGrupo.module.css";
import ContactSection from "../components/home/ContactSection";
import { ActividadesCulturalesInicio } from "./CultureView";
import { TableSection } from "./CultureView";

const PreInscribirseGrupoView = () => {
  const [step, setStep] = useState(1);
  const canvasRef = useRef(null);
 const grupos = [
  "DANZA", "TEATRO", "ZANCOS", "MIMOS", "MÚSICA VALLENATA", "ORQUESTA", "GUITARRAS",
  "BANDA PAPAYERA", "TAMBOBANDA", "CORAL Opus 4", "RAÚL GÓMEZ JATTÍN", "CINE CLUB Ojo pelao"
 ];
  const sexo = [
  "MASCULINO", "FEMENINO", "Otros"
 ];
  const EstadoCivil = [
  "CASADO", "SOLTERO", "DIVORCIADO", "VIUDO"
 ];
  const programas = [
    "Administración de Empresas", "Contaduría Pública", "Economía", "Comercio Internacional",
    "Hotelería y Turismo", "Ingeniería de Sistemas", "Ingeniería Agroindustrial",
    "Ingeniería Ambiental y Sanitaria", "Ingeniería Electrónica", "Enfermería",
    "Instrumentación Quirúrgica", "Microbiología", "Fisioterapia", "Derecho",
    "Sociología", "Psicología", "Licenciatura en Educación Física, Recreación y Deportes",
    "Licenciatura en Lengua Castellana e Idiomas", "Licenciatura en Matemáticas y Física",
    "Licenciatura en Ciencias Naturales y Educación Ambiental", "Licenciatura en Arte, Folclor y Cultura"
  ];
  const [formData, setFormData] = useState({
    foto: null,
    firmaDocumentoP: null, 
    firmaDocumentoO: null, 
    firmaDocumentoM: null, 
    fechaInscripcion: "",
    fechaValoracionMedica: "",
    fechaValoracionOdonto: "",
    fechaValoracionPsico: "",
    grupo: "",
    modalidad: "",
    nombre: "",
    identificacion: "",
    sexo: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    peso: "",
    estatura: "",
    eps: "",
    direccion: "",
    telefono: "",
    celular: "",
    email: "",
    colegio: "",
    fechaTerminacion: "",
    programa: "",
    promedioSemestral: "",
    promedioAcumulado: "",
    ubicacionSemestral: "",
    estrato: "",
    estadoCivil: "",
    madreNombre: "",
    madreId: "",
    madreDireccion: "",
    madreTelefono: "",
    madreOcupacion: "",
    padreNombre: "",
    padreId: "",
    padreDireccion: "",
    padreTelefono: "",
    padreOcupacion: "",
 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["peso", "estatura", "promedioSemestral", "promedioAcumulado"].includes(name) &&
      value &&
      !/^\d*\.?\d*$/.test(value)
    )
      return;
    if (name === "telefono" && value && !/^\d{0,7}$/.test(value)) return;
     if (name === "padreTelefono" && value && !/^\d{0,10}$/.test(value)) return;
      if (name === "madreTelefono" && value && !/^\d{0,10}$/.test(value)) return;
    if (name === "celular" && value && !/^\d{0,10}$/.test(value)) return;
    if (name === "identificacion" && value && !/^\d{0,11}$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, foto: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado correctamente.");
    console.log(formData);
  };

  return (
  <>
      <ActividadesCulturalesInicio />
      <TableSection />

    <div className={styles.container}>
      {/* Barra de progreso */}
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${(step / 6) * 100}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {step === 1 && (
          <>
            <h2>Datos Personales</h2>
            <div className={styles.grid}>
              <label>
                Foto:
                <input type="file" accept="image/*" onChange={handlePhotoUpload} required/>
                {formData.foto && (
                  <img
                    src={formData.foto}
                    alt="Foto"
                    className={styles.previewPhoto}
                  />
                )}
              </label>
              <label>
                Fecha de Inscripción:
                <input
                  type="date"
                  name="fechaInscripcion"
                  value={formData.fechaInscripcion}
                  onChange={handleChange}required
                />
              </label>
             <label>Grupo:
                <select name="grupo" value={formData.grupo} onChange={handleChange} required>
                   <option value="">Seleccione un grupo</option>
                   {grupos.map((grupo, index) => (
                   <option key={index} value={grupo}>{grupo}</option>
                   ))}
                </select>
              </label>
              <label>
                Modalidad:
                <input
                  type="text"
                  name="modalidad"
                  value={formData.modalidad}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Nombres y Apellidos:
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Identificación:
                <input
                  type="text"
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}required
                />
              </label>
              <label>sexo:
                <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                   <option value="">Seleccione un grupo</option>
                   {sexo.map((sexo, index) => (
                   <option key={index} value={sexo}>{sexo}</option>
                   ))}
                </select>
              </label>
              <label>
                Fecha de Nacimiento:
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Lugar de Nacimiento:
                <input
                  type="text"
                  name="lugarNacimiento"
                  value={formData.lugarNacimiento}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Peso (kg):
                <input
                  type="text"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Estatura (cm):
                <input
                  type="text"
                  name="estatura"
                  value={formData.estatura}
                  onChange={handleChange}required
                />
              </label>
              <label>
                EPS:
                <input
                  type="text"
                  name="eps"
                  value={formData.eps}
                  onChange={handleChange}required
                />
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Datos Académicos</h2>
            <div className={styles.grid}>
              <label>
                Dirección:
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Celular:
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Egresado del Colegio:
                <input
                  type="text"
                  name="colegio"
                  value={formData.colegio}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Fecha Terminación Educación Media:
                <input
                  type="date"
                  name="fechaTerminacion"
                  value={formData.fechaTerminacion}
                  onChange={handleChange}required
                />
              </label>
              <label>Programa:
               <select name="Programa" value={formData.programa} onChange={handleChange}required>
                 <option value="">Seleccione un programa</option>
                   {programas.map((programa, index) => (
                 <option key={index} value={programa}>{programa}</option>
                  ))}
                </select>
              </label>
              <label>
                Promedio Semestral:
                <input
                  type="text"
                  name="promedioSemestral"
                  value={formData.promedioSemestral}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Promedio Acumulado:
                <input
                  type="text"
                  name="promedioAcumulado"
                  value={formData.promedioAcumulado}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Ubicación Semestral:
                <select
                  name="ubicacionSemestral"
                  value={formData.ubicacionSemestral}
                  onChange={handleChange}required
                >
                  <option value="">Seleccione</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Estrato:
                <select
                  name="estrato"
                  value={formData.estrato}
                  onChange={handleChange}required
                >
                  <option value="">Seleccione</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
                <label>Estado Civil:
               <select name="EstadoCivil" value={formData.EstadoCivil} onChange={handleChange}required>
                 <option value="">Seleccione </option>
                   {EstadoCivil.map((EstadoCivil, index) => (
                 <option key={index} value={EstadoCivil}>{EstadoCivil}</option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Información Familiar</h2>
            <div className={styles.grid}>
              <label>
                Nombre de la Madre:
                <input
                  type="text"
                  name="madreNombre"
                  value={formData.madreNombre}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Dirección:
                <input
                  type="text"
                  name="madreDireccion"
                  value={formData.madreDireccion}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="madreTelefono"
                  value={formData.madreTelefono}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Ocupación:
                <input
                  type="text"
                  name="madreOcupacion"
                  value={formData.madreOcupacion}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Nombre del Padre:
                <input
                  type="text"
                  name="padreNombre"
                  value={formData.padreNombre}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Dirección:
                <input
                  type="text"
                  name="padreDireccion"
                  value={formData.padreDireccion}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="padreTelefono"
                  value={formData.padreTelefono}
                  onChange={handleChange}required
                />
              </label>
              <label>
                Ocupación:
                <input
                  type="text"
                  name="padreOcupacion"
                  value={formData.padreOcupacion}
                  onChange={handleChange}required
                />
              </label>
            </div>

               <div className="form-section">
                 <h3>Firma del Estudiante</h3>
                   <label>
                    Cargar documento con la firma:
                    <input
                       type="file"
                       name="firmaDocumento"
                       accept=".pdf, .jpg, .jpeg, .png"
                       onChange={(e) =>
                       setFormData({ ...formData, firmaDocumento: e.target.files[0] })
                     }required
                    />
                  </label>
                     {formData.firmaDocumento && (
                       <p style={{ color: "green", fontSize: "0.9rem" }}>
                          Archivo seleccionado: {formData.firmaDocumento.name}
                         </p>
                      )}
               </div>
            </>
        )}

       {step === 4 && ( 
      <>
         <h2 className={styles.sectionTitle}>Control de Valoraciones</h2>
         <h3>Control de Valoración Médica</h3>
              <div className="form-section">
                <label>
                Fecha:
                <input
                  type="date"
                  name="fechaValoracionMedica"
                  value={formData.fechaValoracionMedica}
                  onChange={handleChange}required
                />
              </label>
                <label>
                Nombre:
                <input
                  type="text"
                  name="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}required
                />
              </label>
                <label>
                Identificación:
                <input
                  type="text"
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}required
                />
              </label>
               <label>Grupo:
                <select name="grupo" value={formData.grupo} onChange={handleChange}required>
                   <option value="">Seleccione un grupo</option>
                   {grupos.map((grupo, index) => (
                   <option key={index} value={grupo}>{grupo}</option>
                   ))}
                </select>
              </label>
                 <h3>PROFESIONAL QUE LO ATENDIO:</h3>
                   <label>
                    Cargar documento con la firma:
                    <input
                       type="file"
                       name="firmaDocumentoM"
                       accept=".pdf, .jpg, .jpeg, .png"
                       onChange={(e) =>
                       setFormData({ ...formData, firmaDocumentoM: e.target.files[0] })
                     }required
                    />
                     </label>
                     {formData.firmaDocumentoM && (
                       <p style={{ color: "green", fontSize: "0.9rem" }}>
                          Archivo seleccionado: {formData.firmaDocumentoM.name}
                         </p>
                      )}
              </div>
         </>
        )}
          {step === 5 && ( 
      <>
         <h2 className={styles.sectionTitle}>Control de Valoraciones</h2>
         <h3>Control de Valoración Odontologica</h3>
              <div className="form-section">
                <label>
                Fecha:
                <input
                  type="date"
                  name="fechaValoracionOdonto"
                  value={formData.fechaValoracionOdonto}
                  onChange={handleChange}required
                />
              </label>
                <label>
                Nombre:
                <input
                  type="text"
                  name="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}required
                />
              </label>
                <label>
                Identificación:
                <input
                  type="text"
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}required
                />
              </label>
               <label>Grupo:
                <select name="grupo" value={formData.grupo} onChange={handleChange}required>
                   <option value="">Seleccione un grupo</option>
                   {grupos.map((grupo, index) => (
                   <option key={index} value={grupo}>{grupo}</option>
                   ))}
                </select>
              </label>
                 <h3>PROFESIONAL QUE LO ATENDIO:</h3>
                   <label>
                    Cargar documento con la firma:
                    <input
                       type="file"
                       name="firmaDocumentoO"
                       accept=".pdf, .jpg, .jpeg, .png"
                       onChange={(e) =>
                       setFormData({ ...formData, firmaDocumentoO: e.target.files[0] })
                     }required
                    />
                  </label>
                     {formData.firmaDocumentoO && (
                       <p style={{ color: "green", fontSize: "0.9rem" }}>
                          Archivo seleccionado: {formData.firmaDocumentoO.name}
                         </p>
                      )}
                  </div>
         </>
        )}
          {step === 6 && ( 
            <>
           <h2 className={styles.sectionTitle}>Control de Valoraciones</h2>
            <h3>Control de Valoración Psicologica</h3>
              <div className="form-section">
                <label>
                Fecha:
                <input
                  type="date"
                  name="fechaValoracionPsico"
                  value={formData.fechaValoracionPsico}
                  onChange={handleChange}required
                />
              </label>
                <label>
                Nombre:
                <input
                  type="text"
                  name="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}required
                />
              </label>
                <label>
                Identificación:
                <input
                  type="text"
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}required
                />
              </label>
               <label>Grupo:
                <select name="grupo" value={formData.grupo} onChange={handleChange}required>
                   <option value="">Seleccione un grupo</option>
                   {grupos.map((grupo, index) => (
                   <option key={index} value={grupo}>{grupo}</option>
                   ))}
                </select>
              </label>
                 <h3>PROFESIONAL QUE LO ATENDIO:</h3>
                   <label>
                    Cargar documento con la firma:
                    <input
                       type="file"
                       name="firmaDocumentoP"
                       accept=".pdf, .jpg, .jpeg, .png"
                       onChange={(e) =>
                       setFormData({ ...formData, firmaDocumentoP: e.target.files[0] })
                     }required
                    />
                  </label>
                     {formData.firmaDocumentoP && (
                       <p style={{ color: "green", fontSize: "0.9rem" }}>
                          Archivo seleccionado: {formData.firmaDocumentoP.name}
                         </p>
                      )}
                  </div>
            </>
          )}
        {/* Botones */}
        <div className={styles.buttons}>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              ← Atrás
            </button>
          )}
          {step < 6 && (
            <button type="button" onClick={nextStep}>
              Siguiente →
            </button>
          )}
          {step === 6 && <button type="submit">Enviar Formulario</button>}
        </div>
      </form>
    </div>

   <section className={styles.section}>
        <ContactSection />
      </section>
    </>
  );
};

export default PreInscribirseGrupoView;
