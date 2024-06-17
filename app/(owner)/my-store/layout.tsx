import { NavBar } from '@/components/NavBar';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '내 가게: The Julge',
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function layout({ children }: LayoutProps) {
  return (
    <div>
      <main>
        <NavBar />
        {children}
        {/* <Footer></Footer> */}
      </main>
    </div>
  );
}
