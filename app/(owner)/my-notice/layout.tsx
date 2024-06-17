import Footer from '@/components/Footer';
import { NavBar } from '@/components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSProperties } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const customToastContainerStyle: CSSProperties = {
  position: 'fixed' as 'fixed', // 'fixed'를 명시적으로 설정
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999, // 필요에 따라 조정
};

export default function layout({ children }: LayoutProps) {
  return (
    <div>
      <main>
        <NavBar />
        {children}
        <ToastContainer position="top-center" style={customToastContainerStyle} />
        {/* <Footer></Footer> */}
      </main>
    </div>
  );
}
