export const VOICE_INTRO_PLAYED_KEY = "voiceIntroPlayed";
export const DEMO_INTRO_PLAYED_KEY = "demoIntroPlayed";

export function hasIntroPlayed(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(key) === "true";
}

export function markIntroPlayed(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(key, "true");
}
