export const getScriptFromLocalStorage = () => {
  return localStorage.getItem("script") || "";
};

export const saveScriptToLocalStorage = (script: string) => {
  localStorage.setItem("script", script);
};

const convertBlobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const saveRecordingToLocalStorage = async (blob: Blob) => {
  const base64 = await convertBlobToBase64(blob);
  const recordings = localStorage.getItem("recordings");
  if (recordings) {
    const parsedRecordings = JSON.parse(recordings);
    localStorage.setItem(
      "recordings",
      JSON.stringify([...parsedRecordings, base64])
    );
  } else {
    localStorage.setItem("recordings", JSON.stringify([base64]));
  }
};

export const base64toBlob = (base64: string) => {
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

export const getRecordingsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("recordings") || "[]");
};
