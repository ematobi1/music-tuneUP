import React, { useRef, useState } from "react";
import { getAudioContext } from "../audio-engine/audioRouting";

const RecordPanel: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    const ctx = getAudioContext();
    const dest = ctx.createMediaStreamDestination();
    ctx.destination.disconnect();
    ctx.destination.connect(dest);
    mediaRecorder.current = new MediaRecorder(dest.stream);
    chunks.current = [];
    mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      setBlobUrl(URL.createObjectURL(blob));
    };
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="p-2 bg-zinc-800 text-white rounded">
      <h3 className="font-bold">í´´ Recording</h3>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-3 py-1 rounded ${isRecording ? "bg-red-600" : "bg-green-600"}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {blobUrl && (
        <div className="mt-2">
          <a href={blobUrl} download="mix.webm" className="text-blue-400 underline">
            í¾§ Download Mix
          </a>
        </div>
      )}
    </div>
  );
};

export default RecordPanel;
