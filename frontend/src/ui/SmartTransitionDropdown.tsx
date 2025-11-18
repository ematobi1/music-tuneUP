import React from "react";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export const SmartTransitionDropdown: React.FC<Props> = ({ value, onChange }) => {
  const options = ["Auto", "Linear", "EQ Roll", "Echo Drop", "Cut on Beat"];
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded p-1 text-sm bg-white text-black">
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
