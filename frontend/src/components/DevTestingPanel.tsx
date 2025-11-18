import React from "react";

const DevTestingPanel = () => {
  return (
    <div style={{
      background: "#222",
      color: "#0f0",
      padding: "10px",
      borderRadius: "6px",
      marginTop: "1rem"
    }}>
      <h3>í·ª Dev Testing Panel</h3>
      <ul>
        <li>âœ… UI components mounted</li>
        <li>âœ… Firebase session synced</li>
        <li>âœ… Event logging enabled</li>
      </ul>
    </div>
  );
};

export default DevTestingPanel;
