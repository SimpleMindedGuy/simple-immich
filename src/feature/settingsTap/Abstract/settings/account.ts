import type SimpleImmichPlugin from "main";
import type { App } from "obsidian";
import type { TIconButton } from "src/core/data/base/element/trigger/iconButton";
import type { TImmichAccount, ImmichConnection, ISimpleImmichSettings } from "src/core/data/base/pluginSettings";
import type { BackgroundClass } from "src/core/data/base/style/background";
import type { SettingsHandler } from "src/feature/settingsTap/engine/process/settings/SettingsHandler";

export interface IAccountDetails {
	account: TImmichAccount;
	iconButtons?: Array<TIconButton>;
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



