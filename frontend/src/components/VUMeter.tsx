import React, { useEffect, useRef, useState } from "react";

interface Props {
  analyserNode: AnalyserNode;
}

const VUMeter: React.FC<Props> = ({ analyserNode }) => {
  const [level, setLevel] = useState(0);
  const dataArray = useRef(new Uint8Array(analyserNode.frequencyBinCount));

  useEffect(() => {
    const update = () => {
      analyserNode.getByteFrequencyData(dataArray.current);
      const max = Math.max(...dataArray.current);
      setLevel(max / 255);
      requestAnimationFrame(update);
    };
    update();
  }, [analyserNode]);

  return (
    <div className="h-2 bg-gray-700 w-full mt-2">
      <div
        style={{ width: `${level * 100}%` }}
        className="h-full bg-green-500 transition-all duration-50"
      />
    </div>
  );
};

export default VUMeter;
