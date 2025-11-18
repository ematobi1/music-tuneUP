export const saveSnapshot = (sessionId: string, state: any) => {
  const snapshots = JSON.parse(localStorage.getItem("snapshots") || "{}") || {};
  snapshots[sessionId] = snapshots[sessionId] || [];
  snapshots[sessionId].push({
    timestamp: new Date().toISOString(),
    state,
  });
  localStorage.setItem("snapshots", JSON.stringify(snapshots));
};

export const getSnapshots = (sessionId: string) => {
  const snapshots = JSON.parse(localStorage.getItem("snapshots") || "{}") || {};
  return snapshots[sessionId] || [];
};
