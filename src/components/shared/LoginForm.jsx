/**
 * Componente: LoginForm
 * Formulario de inicio de sesión institucional
 *
 * Arquitectura:
 * - Usa custom hook useLoginForm para la lógica
 * - Usa constantes centralizadas (UI_TEXTS)
 * - Componente de presentación puro
 * - Validación separada en utils/validators
 */

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useLoginForm } from '../../hooks/useLoginForm';
import { UI_TEXTS } from '../../constants';

const LoginForm = () => {
  const {
    email,
    password,
    loading,
    toast,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
      <Toast ref={toast} />

      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-6">
        <div className="w-full max-w-[600px]">
          <Card
            className="shadow-2xl border-t-4 border-brand-356 rounded-lg"
            pt={{
              body: { className: 'p-6' },
              content: { className: 'p-0' }
            }}
          >
            {/* Encabezado */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-brand-356 mb-2">
                {UI_TEXTS.LOGIN_TITLE}
              </h1>
              <p className="text-xs text-gray-600">
                {UI_TEXTS.LOGIN_SUBTITLE}
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Campo de Correo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  {UI_TEXTS.EMAIL_LABEL}
                </label>
                <InputText
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  aria-label={UI_TEXTS.EMAIL_LABEL}
                  placeholder={UI_TEXTS.EMAIL_PLACEHOLDER}
                  disabled={loading}
                  required
                />
              </div>

              {/* Campo de Contraseña */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  {UI_TEXTS.PASSWORD_LABEL}
                </label>
                <Password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                  feedback={false}
                  inputClassName="w-full"
                  aria-label={UI_TEXTS.PASSWORD_LABEL}
                  placeholder={UI_TEXTS.PASSWORD_PLACEHOLDER}
                  disabled={loading}
                  required
                  pt={{
                    root: { className: 'w-full block' }
                  }}
                />
              </div>

              {/* Botón de Inicio de Sesión */}
              <Button
                type="submit"
                label={UI_TEXTS.LOGIN_BUTTON}
                loading={loading}
                className="w-full mt-3 font-semibold"
                style={{
                  backgroundColor: '#007A3D',
                  borderColor: '#007A3D',
                }}
              />

              {/* Nota informativa */}
              <div className="text-center -mt-2">
                <p className="text-xs text-gray-500">
                  Use su correo institucional @unicesar.edu.co
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
