import type { App } from "obsidian";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";
import type { IImmichConnection, ISimpleImmichSettings } from "../../Settings/pluginSettings";



export type TSaveSettings = (
	newSettings: ISimpleImmichSettings,
) => Promise<void>;

export type TLoadSettings = () => Promise<void>;


export interface IConnectionBlock {
	bg?: BackgroundClass;
	app: App;
	connections: Array<IImmichConnection>;
	settingsProcessor: SettingsProcessor;
}

export interface ISettingsTabProps {
	settingsProcessor: SettingsProcessor;
	bg?: BackgroundClass;
	app: App;
}
