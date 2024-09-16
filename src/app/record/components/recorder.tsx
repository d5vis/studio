"use client";
import React, { useEffect, useRef, useState } from "react";
import { saveRecordingToLocalStorage } from "@/app/utils/storage";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startPreview = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMediaStream(stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setMediaBlob(event.data);
      }
    };
  };

  const startRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  useEffect(() => {
    if (!mediaBlob) {
      startPreview();
    }
  }, [mediaBlob]);

  useEffect(() => {
    startPreview();
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-4">
      <div className="w-full h-full">
        {!mediaBlob && (
          <video
            className="w-full h-full rounded-3xl aspect-video border-foreground border-2 border-dotted bg-background"
            ref={videoRef}
            autoPlay
          ></video>
        )}
        {mediaBlob && (
          <video
            className="w-full h-full rounded-3xl aspect-video border-foreground border-2 border-dotted bg-background"
            src={URL.createObjectURL(mediaBlob)}
            controls
          ></video>
        )}
      </div>
      <div className="flex justify-center gap-4">
        {recording && (
          <button
            className="pl-3 pr-3 pt-2 pb-2 rounded-xl border-foreground border-2 border-dotted"
            onClick={stopRecording}
          >
            ⏸️ <b>stop recording</b>
          </button>
        )}
        {!recording && !mediaBlob && (
          <button
            className="pl-3 pr-3 pt-2 pb-2 rounded-xl border-foreground border-2 border-dotted"
            onClick={startRecording}
          >
            ▶️ <b>start recording</b>
          </button>
        )}

        {mediaBlob && (
          <div className="flex gap-4">
            <button
              className="pl-3 pr-3 pt-2 pb-2 rounded-xl border-foreground border-2 border-dotted"
              onClick={() => setMediaBlob(null)}
            >
              ↩️ <b>reset</b>
            </button>
            <button
              className="pl-3 pr-3 pt-2 pb-2 rounded-xl border-foreground border-2 border-dotted"
              onClick={() => saveRecordingToLocalStorage(mediaBlob)}
            >
              💾 <b>save recording</b>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recorder;
