"use client";
import React, { useEffect, useState } from "react";

import Card from "../components/card";

const WritePage = () => {
  const [script, setScript] = useState<string>("");

  const getFromLocalStorage = () => {
    const script = localStorage.getItem("script");
    if (script) {
      setScript(script);
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("script", script);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScript(e.target.value);
  };

  useEffect(() => {
    const saveDebouncer = setTimeout(() => {
      saveToLocalStorage();
      console.log("saved:", script);
    }, 500);
    return () => clearTimeout(saveDebouncer);
  }, [script]);

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <Card>
      <textarea
        className="w-full h-full rounded-xl p-4 bg-surface resize-none"
        placeholder="write your script here"
        value={script}
        onChange={handleTextChange}
      ></textarea>
    </Card>
  );
};

export default WritePage;
