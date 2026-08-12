import type { ISimpleImmichSettings } from "src/Base/Abstract/pluginSettings";

export type TSaveSettings = (
	newSettings: ISimpleImmichSettings,
) => Promise<void>;
export type TLoadSettings = () => Promise<void>;

