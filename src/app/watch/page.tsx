"use client";
import { useEffect, useState } from "react";
import {
  base64toBlob,
  getRecordingsFromLocalStorage,
} from "@/app/utils/storage";

import Card from "../components/card";

const WatchPage = () => {
  const [recordings, setRecordings] = useState<string[]>([]);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);

  const handleDelete = (index: number) => {
    const recordings = localStorage.getItem("recordings");
    if (recordings) {
      const parsedRecordings = JSON.parse(recordings);
      const updatedRecordings = parsedRecordings.filter(
        (_: string[], i: number) => i !== index
      );
      if (updatedRecordings.length === 0) {
        localStorage.removeItem("recordings");
        setRecordings([]);
        setMediaBlob(null);
        return;
      }
      localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
      setMediaBlob(updatedRecordings[updatedRecordings.length - 1]);
      setRecordings(updatedRecordings);
    }
  };

  const handleVideoSrc = (base64: string) => {
    const blob = base64toBlob(base64);
    return blob ? URL.createObjectURL(blob) : "";
  };

  useEffect(() => {
    const parsedRecordings = getRecordingsFromLocalStorage();
    setRecordings(parsedRecordings);
    const lastRecording = parsedRecordings[parsedRecordings.length - 1];
    const base64 = base64toBlob(lastRecording);
    if (base64) {
      setMediaBlob(base64toBlob(lastRecording));
    }
  }, []);

  return (
    <div className="grid grid-cols-[1fr_4fr] w-full h-full gap-4">
      <Card>
        <div className="flex flex-col gap-4 p-2">
          <h1>
            <b>recordings</b>
          </h1>
          {recordings.map((recording, index) => (
            <div className="flex" key={index}>
              <button
                onClick={() => setMediaBlob(base64toBlob(recordings[index]))}
              >
                <video
                  key={index}
                  className="w-full h-full rounded-xl aspect-video border-foreground border-2 border-dotted bg-background"
                  src={handleVideoSrc(recording)}
                ></video>
              </button>
              <button
                className="relative p-2"
                onClick={() => handleDelete(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div>
          {mediaBlob && (
            <video
              className="w-full h-full rounded-3xl aspect-video border-foreground border-2 border-dotted bg-background"
              src={URL.createObjectURL(mediaBlob) || ""}
              controls
            ></video>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WatchPage;
