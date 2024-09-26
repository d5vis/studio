"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttons } from "../utils/constants";

const AppBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex p-3 bg-surface rounded-2xl">
      <div className="flex">
        {buttons.map((button) => {
          const selected = button.path === pathname;
          return (
            <div key={button.label}>
              <Link
                href={button.path}
                className={`transition all m-2 p-2 bg-primary rounded-lg ${
                  selected ? "underline underline-offset-4" : ""
                }`}
              >
                <b>{button.label}</b>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default AppBar;
