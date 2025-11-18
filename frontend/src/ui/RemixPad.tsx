import React from "react";

interface Props {
  label: string;
  onTrigger: () => void;
  isPending?: boolean;
  color?: string;
}

export const RemixPad: React.FC<Props> = ({ label, onTrigger, isPending, color }) => {
  return (
    <button
      onClick={onTrigger}
      className={`w-20 h-20 m-1 rounded-lg font-bold text-sm text-white transition-opacity duration-300 ${
        isPending ? "opacity-50 cursor-wait" : "opacity-100"
      }`}
      style={{ backgroundColor: color || "#444" }}
    >
      {isPending ? "⏳" : label}
    </button>
  );
};
