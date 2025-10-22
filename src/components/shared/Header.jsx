/**
 * Componente: Header
 * Barra de navegación superior con logo y menú de portales
 *
 * Arquitectura:
 * - Usa constantes centralizadas (PORTALES_MENU_ITEMS)
 * - Estilos separados en CSS Module
 * - Componente puro de presentación
 */

import { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { PORTALES_MENU_ITEMS } from '../../constants';

const Header = () => {
  const menuPortales = useRef(null);

  // Transforma los items de navegación para PrimeReact Menu
  const menuItems = PORTALES_MENU_ITEMS.map(item => ({
    ...item,
    command: () => {
      // TODO: Implementar navegación con React Router
      console.log(`Navegando a: ${item.url}`);
    }
  }));

  return (
    <>
      <Menu model={menuItems} popup ref={menuPortales} />

      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto pl-0 pr-4 py-3 -ml-3">
          <div className="flex items-center justify-between">
            {/* Logo UPC */}
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Logo_upc_nuevo.png"
                alt="Universidad Popular del Cesar"
                className="w-[200px] h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Crect width="200" height="60" fill="white"/%3E%3Ccircle cx="30" cy="30" r="25" stroke="%231C7A3D" stroke-width="4" fill="none"/%3E%3Ctext x="70" y="38" fill="%231C7A3D" font-size="20" font-weight="bold"%3EUPC%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Botón Portales */}
            <Button
              label="Portales"
              icon="pi pi-angle-down"
              iconPos="right"
              onClick={(e) => menuPortales.current.toggle(e)}
              className="text-white font-semibold px-6 shadow-md hover:shadow-lg transition-all"
              style={{
                backgroundColor: '#1C7A3D',
                borderColor: '#1C7A3D',
                borderRadius: '0.375rem',
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
