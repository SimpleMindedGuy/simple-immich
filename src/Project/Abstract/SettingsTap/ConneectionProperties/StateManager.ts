import type { App } from "obsidian";
import type { IComponentProcessor } from "src/Base/Abstract/element/controller";
import type { IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { TConnection_Form_Layout, TConnection_Form_Commands_Map } from "./ConnectionPropertiesButton";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/IButton";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";
import type { TMousehandler } from "../../Settings/account";

export type IAccountPropertiesController = IComponentProcessor<TConnectionPropertiesMeta, TConnectionPropertiesState, TConnection_Form_Commands_Map>



export interface IConnectionProperties {

	// Required
	connection: IImmichConnection;
	settingsHandler: SettingsProcessor;
	formFunction: TConnection_Form_Layout;


	// Optional
	app?: App;
	bg?: BackgroundClass;
	editing?: boolean;
}

export type TConnectionPropertiesState = {

	// Required
	isEditing: boolean,
	formIcons: Array<TBaseButton>,
	connection: IImmichConnection,
	accounts: Array<TImmichAccount>

	// Optional
}


export type TConnectionPropertiesMeta = {

	// Required
	formMode: TConnection_Form_Layout
	bg: BackgroundClass,
	nextBg: BackgroundClass,

	// Optional
	app?: App,
	originalConnection?: IImmichConnection,
}



export interface IConnectionForm {

	// Required
	connection: IImmichConnection;
	bg: BackgroundClass;


	// Optional
	app?: App;
	buttons?: Array<TBaseButton>;
	formFunction?: TConnection_Form_Layout;
	submitHandler?: TMousehandler;
	toggleEditing?: TMousehandler;

}




