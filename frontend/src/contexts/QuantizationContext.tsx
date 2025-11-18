import React, { createContext, useContext, useState } from "react";

export type QuantizationLevel = "1/8" | "1/4" | "1/2" | "1" | "2" | "4";

interface QuantizationContextProps {
  quantization: QuantizationLevel;
  setQuantization: (q: QuantizationLevel) => void;
}

const QuantizationContext = createContext<QuantizationContextProps | undefined>(undefined);

export const QuantizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quantization, setQuantization] = useState<QuantizationLevel>("1");
  return (
    <QuantizationContext.Provider value={{ quantization, setQuantization }}>
      {children}
    </QuantizationContext.Provider>
  );
};

export function useQuantization() {
  const context = useContext(QuantizationContext);
  if (!context) throw new Error("useQuantization must be used within a QuantizationProvider");
  return context;
}
