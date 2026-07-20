import type { App } from "obsidian";
import type { TAccount_Form_Layout } from "./IconButton";
import type { TonSecretChange } from "src/Base/Abstract/element/input/secret";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/iconButton";
import type { TImmichAccount, ImmichConnection } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { TMousehandler } from "src/Project/Abstract/Settings/account";
import type { SettingsHandler } from "src/Project/Engine/Process/Settings/SettingsHandler";




export interface IAccountForm {
	account: TImmichAccount;
	bg: BackgroundClass;
	secret: string | null;
	email: string | null;
	isApi: boolean;
	app?: App;
	iconButtons?: Array<TBaseButton>;
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
