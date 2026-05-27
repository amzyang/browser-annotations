import type { Annotation } from "~/sidebar/annotations";
import { isValidAnnotation } from "~/sidebar/annotations";

type Settings = {
  webhookEnabled: boolean;
  webhookUrl: string;
};

export type SidebarState = Settings & {
  annotations: Annotation[];
};

const settingsKey = (origin: string) => `feedback:${origin}:settings`;
const annotationPrefix = (origin: string) => `feedback:${origin}:annotation:`;
const annotationKey = (origin: string, annotationId: string) =>
  `${annotationPrefix(origin)}${annotationId}`;

const DEFAULT_SETTINGS: Settings = {
  webhookEnabled: true,
  webhookUrl: "http://127.0.0.1:3330/",
};

const getSettings = (value: unknown): Settings => {
  if (
    !value ||
    typeof value !== "object" ||
    typeof (value as Settings).webhookEnabled !== "boolean" ||
    typeof (value as Settings).webhookUrl !== "string"
  ) {
    return DEFAULT_SETTINGS;
  }

  return value as Settings;
};

const loadSettings = async (origin: string) => {
  const result = await chrome.storage.local.get([settingsKey(origin)]);
  return getSettings(result[settingsKey(origin)]);
};

const loadAnnotations = async (origin: string) => {
  const prefix = annotationPrefix(origin);
  const result = await chrome.storage.local.get(null);

  return Object.entries(result)
    .flatMap(([key, value]) => (key.startsWith(prefix) && isValidAnnotation(value) ? [value] : []))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};

export async function loadState(origin: string): Promise<SidebarState> {
  const [settings, annotations] = await Promise.all([
    loadSettings(origin),
    loadAnnotations(origin),
  ]);

  return { ...settings, annotations };
}

export const setWebhookEnabled = async (origin: string, webhookEnabled: boolean) => {
  try {
    const settings = await loadSettings(origin);
    await chrome.storage.local.set({
      [settingsKey(origin)]: { ...settings, webhookEnabled },
    });
  } catch (error) {
    console.error("Failed to save webhook setting", error);
  }
};

export const setWebhookUrl = async (origin: string, webhookUrl: string) => {
  try {
    const settings = await loadSettings(origin);
    await chrome.storage.local.set({
      [settingsKey(origin)]: { ...settings, webhookUrl },
    });
  } catch (error) {
    console.error("Failed to save webhook URL", error);
  }
};

export const addAnnotation = async (origin: string, annotation: Annotation) => {
  try {
    await chrome.storage.local.set({
      [annotationKey(origin, annotation.id)]: annotation,
    });
  } catch (error) {
    console.error("Failed to save annotation", error);
  }
};

export const setAnnotationScreenshot = async (
  origin: string,
  annotation: Annotation,
  screenshot: string,
) => {
  try {
    const key = annotationKey(origin, annotation.id);
    const result = await chrome.storage.local.get([key]);
    const storedAnnotation = isValidAnnotation(result[key]) ? result[key] : annotation;

    await chrome.storage.local.set({
      [key]: { ...storedAnnotation, screenshot },
    });
  } catch (error) {
    console.error("Failed to save annotation screenshot", error);
  }
};

export const removeAnnotations = async (origin: string, annotationIds: string[]) =>
  chrome.storage.local
    .remove(annotationIds.map((id) => annotationKey(origin, id)))
    .catch((error) => console.error("Failed to remove annotations", error));

export const clearAnnotations = async (origin: string) => {
  try {
    const prefix = annotationPrefix(origin);
    const result = await chrome.storage.local.get(null);

    await chrome.storage.local.remove(Object.keys(result).filter((key) => key.startsWith(prefix)));
  } catch (error) {
    console.error("Failed to clear annotations", error);
  }
};

export function onStorageChange(
  getOrigin: () => string | null,
  apply: (state: SidebarState) => void,
) {
  const listener = async (
    changes: { [key: string]: chrome.storage.StorageChange },
    area: string,
  ) => {
    const origin = getOrigin();
    if (area !== "local" || !origin) return;

    const keys = Object.keys(changes);
    if (
      !keys.some((key) => key === settingsKey(origin) || key.startsWith(annotationPrefix(origin)))
    )
      return;

    try {
      const state = await loadState(origin);
      if (getOrigin() !== origin) return;
      apply(state);
    } catch (error) {
      console.error("Failed to load sidebar state", error);
    }
  };

  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
