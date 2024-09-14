"use client";
import { useEffect, useState } from "react";

import Card from "../components/card";

const WatchPage = () => {
  const [recordings, setRecordings] = useState<string[]>([]);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);

  const base64toBlob = (base64: string) => {
    const cleanedBase64 = base64.replace(/^[^,]+,/, "").replace(/\s/g, "");
    const byteString = atob(cleanedBase64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  const getRecordingsFromLocalStorage = () => {
    const recordings = localStorage.getItem("recordings");
    if (recordings) {
      const parsedRecordings = JSON.parse(recordings);
      setRecordings(parsedRecordings);
      const lastRecording = parsedRecordings[parsedRecordings.length - 1];
      setMediaBlob(base64toBlob(lastRecording));
    }
  };

  const handleDelete = (index: number) => {
    const recordings = localStorage.getItem("recordings");
    if (recordings) {
      const parsedRecordings = JSON.parse(recordings);
      const updatedRecordings = parsedRecordings.filter(
        (_: any, i: number) => i !== index
      );
      if (updatedRecordings.length === 0) {
        localStorage.removeItem("recordings");
        setRecordings([]);
        setMediaBlob(null);
        return;
      }
      localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
      setRecordings(updatedRecordings);
      setMediaBlob(updatedRecordings[updatedRecordings.length - 1]);
    }
  };

  useEffect(() => {
    getRecordingsFromLocalStorage();
  }, []);

  return (
    <div className="grid grid-cols-[1fr_4fr] w-full h-full gap-4">
      <Card>
        <div className="flex flex-col gap-4 p-2">
          <h1>
            <b>recordings</b>
          </h1>
          {recordings.map((recording, index) => (
            <div className="flex">
              <button
                onClick={() => setMediaBlob(base64toBlob(recordings[index]))}
              >
                <video
                  key={index}
                  className="w-full h-full rounded-xl aspect-video border-foreground border-2 border-dotted bg-background"
                  src={URL.createObjectURL(base64toBlob(recording)) || ""}
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
