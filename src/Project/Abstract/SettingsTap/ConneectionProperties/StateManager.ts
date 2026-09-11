import type { App } from "obsidian";
import type { IComponentProcessor } from "src/Base/Abstract/element/controller";
import type { IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { TBaseButton, TBaseEventHandler } from "src/Base/Abstract/element/trigger/IButton";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";
import type { TConnection_Form_Commands_Map, TConnection_Form_Layout } from "./Button";



export interface IConnectionInputSection {
	settingsProcessor: SettingsProcessor;
	formFunction: string;

	bg?: BackgroundClass;
	url?: string;
	title?: string | null;
	connection?: IImmichConnection | null;
}

export interface IConnectionProperties {

	// Required
	settingsProcessor: SettingsProcessor;


	// Optional
	bg?: BackgroundClass;
	app?: App;
	title?: string;
	editing?: boolean;
	connection?: IImmichConnection;
	formFunction?: TConnection_Form_Layout;
}

export type TConnectionPropertiesState = {

	// Required
	isEditing: boolean,
	formIcons: Array<TBaseButton>,
	connection: IImmichConnection | null,
	accounts: Array<TImmichAccount>
	inputUrl: string,

	// Optional
}


export type TConnectionPropertiesMeta = {

	// Required
	formMode: TConnection_Form_Layout
	bg: BackgroundClass,
	nextBg: BackgroundClass,

	// Optional
	app?: App,
	title?: string,
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
	submitHandler?: TBaseEventHandler;
	toggleEditing?: TBaseEventHandler;

}



export type IConnectionPropertiesController = IComponentProcessor<TConnectionPropertiesMeta, TConnectionPropertiesState, TConnection_Form_Commands_Map>

