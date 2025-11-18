import React from "react";

const HistoryPanel = ({ entries }: { entries: any[] }) => (
  <div style={{ color: "white", padding: "8px" }}>
    <h4>íµ˜ Mix History</h4>
    <ul>
      {entries.map((e, i) => (
        <li key={i}>Saved by {e.user} at {new Date(e.timestamp).toLocaleTimeString()}</li>
      ))}
    </ul>
  </div>
);

export default HistoryPanel;
