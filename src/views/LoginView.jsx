/**
 * Vista: LoginView
 * Página de inicio de sesión
 *
 * Arquitectura:
 * - Vista principal que compone el LoginForm
 * - Punto de entrada para la autenticación
 * - Puede expandirse con más funcionalidades (registro, recuperación de contraseña, etc.)
 */

import LoginForm from '../components/shared/LoginForm';

const LoginView = () => {
  return <LoginForm />;
};

export default LoginView;
