
import type { ISimpleImmichSettings } from "src/core/data/base/pluginSettings";
import { writable } from "svelte/store";
import { DEFAULT_SETTINGS } from "./defaultValue";

export const SettingsStore = writable<ISimpleImmichSettings>(DEFAULT_SETTINGS);
