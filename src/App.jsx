/**
 * Componente Principal: App
 * Punto de entrada de la aplicación
 *
 * Arquitectura:
 * - Usa MainLayout para estructura consistente
 * - Importa vistas desde views/
 * - TODO: Agregar React Router para manejo de rutas
 */

import MainLayout from './components/layouts/MainLayout'
import LoginView from './views/LoginView'

function App() {
  return (
    <MainLayout>
      <LoginView />
    </MainLayout>
  )
}

export default App
