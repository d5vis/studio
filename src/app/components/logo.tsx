import Link from "next/link";

const Logo = () => {
  return (
    <div className="pt-3 pb-3 pl-4 pr-4 bg-surface rounded-2xl">
      <Link href="/">
        🎬
        <b> studio</b>
      </Link>
    </div>
  );
};

export default Logo;
