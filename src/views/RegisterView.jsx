/**
 * Vista: RegisterView
 * Vista de registro de usuario
 */

import { Link } from 'react-router-dom';
import RegisterForm from '../components/shared/RegisterForm';

const RegisterView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RegisterForm />

        {/* Enlace al login */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Enlace a Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-700 inline-flex items-center gap-2"
          >
            <i className="pi pi-arrow-left"></i>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
