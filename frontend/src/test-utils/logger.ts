export function logEvent(name: string, payload?: any) {
  console.log(`íºµ [Event]: ${name}`, payload || "(no payload)");
}
