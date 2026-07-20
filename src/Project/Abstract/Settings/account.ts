import type SimpleImmichPlugin from "main";
import type { App } from "obsidian";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/iconButton";
import type { TImmichAccount, ImmichConnection, ISimpleImmichSettings } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { SettingsHandler } from "src/Project/Engine/Process/Settings/SettingsHandler";


export interface IAccountDetails {
	account: TImmichAccount;
	iconButtons?: Array<TBaseButton>;
	bg: BackgroundClass;
}


export interface IServerBlock {
	app: App;
	connection: ImmichConnection;
	settingsHandler: SettingsHandler;
	bg?: BackgroundClass;
}



export interface ISettingsTabProps {
	settingsHandler: SettingsHandler;
	saveSettings: (newSettings: ISimpleImmichSettings) => Promise<void>;
	loadSettings: () => Promise<void>;
	plugin: SimpleImmichPlugin;
	app: App;
}


export type TMousehandler = (
	event: MouseEvent | PointerEvent,
) => unknown | Promise<unknown>;



