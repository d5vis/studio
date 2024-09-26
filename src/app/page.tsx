import Link from "next/link";

import Card from "./components/card";
import { buttons } from "./utils/constants";

export default function Home() {
  return (
    <Card>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl">
          <b>🎬 davis&apos; recording studio</b>
        </h1>
        <p>a simple place to write, record, and watch videos</p>
        <div className="flex gap-4">
          {buttons.map((button, index) => {
            return (
              <Link
                key={index}
                href={button.path}
                className="border-foreground border-2 border-dotted pt-2 pb-2 pl-4 pr-4 rounded-xl"
              >
                <b>{button.label}</b>
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
