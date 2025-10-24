import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout showSubMenu={true}>
            <HomeView />
          </MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout showSubMenu={false}>
            <LoginView />
          </MainLayout>
        } />
      </Routes>
    </Router>
  )
}

export default App
