import type SimpleImmichPlugin from "main";
import type { App } from "obsidian";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/IButton";
import type { TImmichAccount, IImmichConnection, ISimpleImmichSettings } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";


export interface IAccountDetails {
	account: TImmichAccount;
	iconButtons?: Array<TBaseButton>;
	bg: BackgroundClass;
}


export interface IServerBlock {
	app: App;
	connection: IImmichConnection;
	settingsProcessor: SettingsProcessor;
	bg?: BackgroundClass;
}



export interface ISettingsTabProps {
	settingsProcessor: SettingsProcessor;
	saveSettings: (newSettings: ISimpleImmichSettings) => Promise<void>;
	loadSettings: () => Promise<void>;
	plugin: SimpleImmichPlugin;
	app: App;
}


export type TMousehandler = (
	event: MouseEvent | PointerEvent,
) => unknown | Promise<unknown>;



