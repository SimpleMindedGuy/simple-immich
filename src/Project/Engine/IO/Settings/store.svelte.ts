
import { writable } from "svelte/store";
import { DEFAULT_SETTINGS } from "../../Default/Settings/defaultValue";
import type { ISimpleImmichSettings } from "src/Base/Abstract/pluginSettings";

export const SettingsStore = writable<ISimpleImmichSettings>(DEFAULT_SETTINGS);
