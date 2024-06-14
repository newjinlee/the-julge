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
        <div className="flex flex-col items-center justify-start m-0 p-0">
          <div className="lg:w-[964px] sm:w-[680px] lg:mx-[32px] w-full px-[12px]">{children}</div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
