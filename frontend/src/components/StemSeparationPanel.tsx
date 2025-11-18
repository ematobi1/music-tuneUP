import React, { useState } from "react";

const StemSeparationPanel: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsProcessing(true);
            console.log("STEM separation started for:", file.name);
            // simulate async processing
            setTimeout(() => {
                setResult(`‚úÖ STEM separation complete: ${file.name}`);
                setIsProcessing(false);
            }, 2000);
        }
    };

    return (
        <div style={{ padding: "10px", background: "#222", borderRadius: "8px", color: "white" }}>
            <h4>STEM Separation</h4>
            <input type="file" accept="audio/*" onChange={handleUpload} disabled={isProcessing} />
            {isProcessing && <p>Separating stems... ÌæöÔ∏è</p>}
            {result && <p>{result}</p>}
        </div>
    );
};

export default StemSeparationPanel;
