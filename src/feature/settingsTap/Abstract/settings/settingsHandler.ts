import type { ISimpleImmichSettings } from "src/core/data/base/pluginSettings";

export type TSaveSettings = (
	newSettings: ISimpleImmichSettings,
) => Promise<void>;
export type TLoadSettings = () => Promise<void>;

