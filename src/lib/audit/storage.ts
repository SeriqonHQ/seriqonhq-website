import { AUDIT_STORAGE_KEY, DEFAULT_AUDIT_FORM, type AuditFormData } from "./types";

export function loadAuditProgress(): {
  step: number;
  data: AuditFormData;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      step: number;
      data: AuditFormData;
    };
    return {
      step: parsed.step,
      data: { ...DEFAULT_AUDIT_FORM, ...parsed.data },
    };
  } catch {
    return null;
  }
}

export function saveAuditProgress(step: number, data: AuditFormData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    AUDIT_STORAGE_KEY,
    JSON.stringify({ step, data, savedAt: Date.now() })
  );
}

export function clearAuditProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUDIT_STORAGE_KEY);
}
