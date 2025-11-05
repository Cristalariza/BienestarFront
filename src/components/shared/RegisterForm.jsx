/**
 * Componente: RegisterForm
 * Formulario de registro de usuario
 */

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { useRegisterForm } from '../../hooks/useRegisterForm';

const RegisterForm = () => {
  const {
    formData,
    facultades,
    programas,
    estamentos,
    loading,
    loadingData,
    toast,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  // Opciones para tipo de documento
  const tiposDocumento = [
    { label: 'C.C', value: 'CC' },
    { label: 'T.I', value: 'TI' },
    { label: 'C.E', value: 'CE' },
    { label: 'Pasaporte', value: 'PASAPORTE' }
  ];

  // Filtrar programas por facultad seleccionada
  const programasFiltrados = formData.facultad_id
    ? programas.filter(p => p.facultad_id === formData.facultad_id)
    : [];

  if (loadingData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <i className="pi pi-spin pi-spinner text-4xl text-green-600"></i>
        <p className="ml-4 text-gray-600">Cargando datos del formulario...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <Toast ref={toast} />

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          REGISTRO DE USUARIO
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Sexo */}
          <div className="flex gap-6 justify-center mb-6">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="sexo-m"
                name="sexo"
                value="M"
                onChange={(e) => handleChange('sexo', e.value)}
                checked={formData.sexo === 'M'}
              />
              <label htmlFor="sexo-m" className="cursor-pointer text-sm">Hombre</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="sexo-f"
                name="sexo"
                value="F"
                onChange={(e) => handleChange('sexo', e.value)}
                checked={formData.sexo === 'F'}
              />
              <label htmlFor="sexo-f" className="cursor-pointer text-sm">Mujer</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="sexo-o"
                name="sexo"
                value="O"
                onChange={(e) => handleChange('sexo', e.value)}
                checked={formData.sexo === 'O'}
              />
              <label htmlFor="sexo-o" className="cursor-pointer text-sm">Otros</label>
            </div>
          </div>

          {/* Primera fila: Primer Nombre, Segundo Nombre, ROL */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="primer_nombre" className="block text-xs font-bold text-gray-700 mb-1">
                Primer Nombre<span className="text-red-600">*</span>
              </label>
              <InputText
                id="primer_nombre"
                placeholder="Ingrese su primer nombre"
                value={formData.primer_nombre}
                onChange={(e) => handleChange('primer_nombre', e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="segundo_nombre" className="block text-xs font-bold text-gray-700 mb-1">
                Segundo Nombre
              </label>
              <InputText
                id="segundo_nombre"
                placeholder="Ingrese su segundo nombre"
                value={formData.segundo_nombre}
                onChange={(e) => handleChange('segundo_nombre', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="rol" className="block text-xs font-bold text-gray-700 mb-1">
                ROL<span className="text-red-600">*</span>
              </label>
              <Dropdown
                id="rol"
                value={formData.rol}
                options={estamentos.map(e => ({ label: e.nombre, value: e.estamento_id }))}
                onChange={(e) => handleChange('rol', e.value)}
                placeholder="Seleccione su rol"
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Segunda fila: Primer Apellido, Segundo Apellido, Orientación Sexual */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="primer_apellido" className="block text-xs font-bold text-gray-700 mb-1">
                Primer Apellido<span className="text-red-600">*</span>
              </label>
              <InputText
                id="primer_apellido"
                placeholder="Ingrese su primer apellido"
                value={formData.primer_apellido}
                onChange={(e) => handleChange('primer_apellido', e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="segundo_apellido" className="block text-xs font-bold text-gray-700 mb-1">
                Segundo Apellido
              </label>
              <InputText
                id="segundo_apellido"
                placeholder="Ingrese su segundo apellido"
                value={formData.segundo_apellido}
                onChange={(e) => handleChange('segundo_apellido', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="orientacion_sexual" className="block text-xs font-bold text-gray-700 mb-1">
                Orientación Sexual
              </label>
              <InputText
                id="orientacion_sexual"
                placeholder="Opcional"
                value={formData.orientacion_sexual}
                onChange={(e) => handleChange('orientacion_sexual', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Tercera fila: Tipo, Identificación, Fecha Nacimiento */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="tipo_documento" className="block text-xs font-bold text-gray-700 mb-1">
                Tipo<span className="text-red-600">*</span>
              </label>
              <Dropdown
                id="tipo_documento"
                value={formData.tipo_documento}
                options={tiposDocumento}
                onChange={(e) => handleChange('tipo_documento', e.value)}
                placeholder="Seleccione su tipo de documento"
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="numero_documento" className="block text-xs font-bold text-gray-700 mb-1">
                Identificación<span className="text-red-600">*</span>
              </label>
              <InputText
                id="numero_documento"
                placeholder="Ingrese su numero de documento"
                value={formData.numero_documento}
                onChange={(e) => handleChange('numero_documento', e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="fecha_nacimiento" className="block text-xs font-bold text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <InputText
                id="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Cuarta fila: Correo, Celular, Domicilio */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="correo" className="block text-xs font-bold text-gray-700 mb-1">
                Correo Institucional<span className="text-red-600">*</span>
              </label>
              <InputText
                id="correo"
                type="email"
                placeholder="Ingrese su correo institucional"
                value={formData.correo_elec}
                onChange={(e) => handleChange('correo_elec', e.target.value)}
                className="w-full"
                pattern="[a-zA-Z0-9._%+-]+@unicesar\.edu\.co$"
                title="Debe usar su correo institucional @unicesar.edu.co"
                required
              />
            </div>

            <div>
              <label htmlFor="celular" className="block text-xs font-bold text-gray-700 mb-1">
                Celular<span className="text-red-600">*</span>
              </label>
              <InputText
                id="celular"
                placeholder="Ingrese su número de celular"
                value={formData.celular}
                onChange={(e) => handleChange('celular', e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="domicilio" className="block text-xs font-bold text-gray-700 mb-1">
                Domicilio<span className="text-red-600">*</span>
              </label>
              <InputText
                id="domicilio"
                placeholder="Ingrese su dirección"
                value={formData.domicilio}
                onChange={(e) => handleChange('domicilio', e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Quinta fila: Facultad, Programa, Contraseña */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="facultad" className="block text-xs font-bold text-gray-700 mb-1">
                Facultad<span className="text-red-600">*</span>
              </label>
              <Dropdown
                id="facultad"
                value={formData.facultad_id}
                options={facultades.map(f => ({ label: f.nombre, value: f.facultad_id }))}
                onChange={(e) => {
                  handleChange('facultad_id', e.value);
                  handleChange('programa_academico_id', null);
                }}
                placeholder="Seleccione su facultad"
                className="w-full"
                emptyMessage="No hay facultades disponibles"
                required
              />
            </div>

            <div>
              <label htmlFor="programa" className="block text-xs font-bold text-gray-700 mb-1">
                Programa
              </label>
              <Dropdown
                id="programa"
                value={formData.programa_academico_id}
                options={programasFiltrados.map(p => ({ label: p.nombre, value: p.programa_academico_id }))}
                onChange={(e) => handleChange('programa_academico_id', e.value)}
                placeholder="Seleccione su programa"
                className="w-full"
                emptyMessage="Seleccione primero una facultad"
                disabled={!formData.facultad_id || programasFiltrados.length === 0}
              />
            </div>

            <div>
              <label htmlFor="contrasenia" className="block text-xs font-bold text-gray-700 mb-1">
                Contraseña<span className="text-red-600">*</span>
              </label>
              <Password
                id="contrasenia"
                placeholder="Ingrese su contraseña"
                value={formData.contrasenia}
                onChange={(e) => handleChange('contrasenia', e.target.value)}
                toggleMask
                feedback={false}
                className="w-full"
                inputClassName="w-full"
                required
              />
            </div>
          </div>

          {/* Botón de registro */}
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              label="Registrar Usuario"
              loading={loading}
              className="text-white font-semibold"
              style={{
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
                borderRadius: '6px',
                padding: '10px 40px',
                fontSize: '15px'
              }}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
