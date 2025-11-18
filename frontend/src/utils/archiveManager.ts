export const archiveTrack = (trackId: string) => {
  const archive = JSON.parse(localStorage.getItem("archivedTracks") || "[]");
  if (!archive.includes(trackId)) {
    archive.push(trackId);
    localStorage.setItem("archivedTracks", JSON.stringify(archive));
  }
};

export const restoreTrack = (trackId: string) => {
  let archive = JSON.parse(localStorage.getItem("archivedTracks") || "[]");
  archive = archive.filter((id: string) => id !== trackId);
  localStorage.setItem("archivedTracks", JSON.stringify(archive));
};

export const isArchived = (trackId: string) => {
  const archive = JSON.parse(localStorage.getItem("archivedTracks") || "[]");
  return archive.includes(trackId);
};
