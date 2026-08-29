import type { App } from "obsidian";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/IButton";
import type { IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";

export interface IAccountDetails {
	account: TImmichAccount;
	iconButtons?: Array<TBaseButton>;
	bg: BackgroundClass;
}

export interface IAccountBlock {
	app: App;
	connection: IImmichConnection;
	settingsProcessor: SettingsProcessor;
	accounts: Array<TImmichAccount>;


	bg?: BackgroundClass;
}
