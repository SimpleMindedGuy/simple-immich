import type { App } from "obsidian";
import type { TonSecretChange } from "src/core/data/base/element/input/secret";
import type { ImmichConnection, TImmichAccount } from "src/core/data/base/pluginSettings";
import type { BackgroundClass } from "src/core/data/base/style/background";
import type { TMousehandler } from "../settings/account";
import type { SettingsHandler } from "src/feature/settingsTap/engine/process/settings/SettingsHandler";
import type { IBaseButtonMap } from "src/core/data/base/element/trigger/iconButton";
import type { TAccount_Form_Layout } from "./IconButton";




export interface IAccountForm {
	account: TImmichAccount;
	bg: BackgroundClass;
	secret: string | null;
	email: string | null;
	isApi: boolean;
	app?: App;
	iconButtons?: Array<IBaseButtonMap>;
	externalController?: boolean;
	formFunction?: TAccount_Form_Layout;
	onSecretChange?: TonSecretChange;
	submitHandler?: TMousehandler;
	toggleEditing?: TMousehandler;
}


export interface IAccountProperties {
	app?: App;
	connection: ImmichConnection;
	account?: TImmichAccount;
	settingsHandler: SettingsHandler;
	formFunction: TAccount_Form_Layout;
	displayAnimation?: boolean;
	bg?: BackgroundClass;
	hidden?: boolean;
	editing?: boolean;
	externalController?: boolean;
}
