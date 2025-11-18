const lockState: Record<string, boolean> = {};

export const toggleLock = (trackId: string) => {
  lockState[trackId] = !lockState[trackId];
  return lockState[trackId];
};

export const isLocked = (trackId: string) => {
  return !!lockState[trackId];
};
