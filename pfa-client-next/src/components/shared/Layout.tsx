import NavBar from "@src/components/shared/navBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start space-y-8 bg-grey1">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
