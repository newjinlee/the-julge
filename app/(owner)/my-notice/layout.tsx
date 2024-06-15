import Footer from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function layout({ children }: LayoutProps) {
  return (
    <div>
      <main>
        <NavBar />
        {children}
        <Footer></Footer>
      </main>
    </div>
  );
}
