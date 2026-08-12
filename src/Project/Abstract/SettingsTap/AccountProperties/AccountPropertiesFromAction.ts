import type { App } from "obsidian";
import type { TAccount_Form_Layout } from "./AccountProperitesButton";
import type { TonSecretChange } from "src/Base/Abstract/element/input/secret";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/IButton";
import type { TImmichAccount, IImmichConnection } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { TMousehandler } from "src/Project/Abstract/Settings/account";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";




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


export interface IAccountFormProperties {
	app?: App;
	connection: IImmichConnection;
	account?: TImmichAccount;
	settingsProcessor: SettingsProcessor;
	formFunction: TAccount_Form_Layout;
	displayAnimation?: boolean;
	bg: BackgroundClass;
	hidden?: boolean;
	editing?: boolean;
	externalController?: boolean;
}
