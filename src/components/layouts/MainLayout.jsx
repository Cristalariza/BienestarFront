import Header from '../shared/Header';
import SubMenu from '../shared/SubMenu';
import Footer from '../shared/Footer';

const MainLayout = ({ children, showSubMenu = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <SubMenu show={showSubMenu} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
