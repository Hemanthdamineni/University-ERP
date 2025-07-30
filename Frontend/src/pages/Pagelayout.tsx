import { useLocation } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {isAuthPage ? (
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      ) : (
        <>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
} 