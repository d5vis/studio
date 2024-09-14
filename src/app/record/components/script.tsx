"use client";
import { useEffect, useState } from "react";

const Script = () => {
  const [script, setScript] = useState("");

  const getScriptFromLocalStorage = () => {
    const script = localStorage.getItem("script");
    if (script) {
      setScript(script);
    }
  };

  useEffect(() => {
    getScriptFromLocalStorage();
  }, []);

  return (
    <div className="p-2">
      <h1>
        <b>script</b>
      </h1>
      <div className="w-full h-full rounded-xl p-4 bg-surface resize-none text-left">
        {script}
      </div>
    </div>
  );
};

export default Script;
