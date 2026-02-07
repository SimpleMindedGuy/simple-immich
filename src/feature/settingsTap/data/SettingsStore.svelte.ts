import { writable } from "svelte/store";
import { DEFAULT_SETTINGS, type SimpleImmichSettings } from "src/core/pluginSettings";

export const SettingsStore = writable<SimpleImmichSettings>(DEFAULT_SETTINGS);
