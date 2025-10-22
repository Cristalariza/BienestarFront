/**
 * Componente: MainLayout
 * Layout principal de la aplicación con Header, contenido y Footer
 *
 * Arquitectura:
 * - Recibe children para renderizar contenido dinámico
 * - Estructura flex para footer sticky
 * - Componentes modulares (Header, Footer)
 */

import Header from '../shared/Header';
import Footer from '../shared/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
