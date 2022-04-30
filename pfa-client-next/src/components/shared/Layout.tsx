import NavBar from "@src/components/shared/navBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-grey1">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
