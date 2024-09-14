import AppBar from "./appbar";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="grid grid-cols-[auto_1fr] min-w-screen gap-4">
      <Logo />
      <AppBar />
    </header>
  );
};

export default Header;
