import type { App } from "obsidian";
import type { IComponentProcessor } from "src/Base/Abstract/element/controller";
import type { IImmichConnection } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";
import type { TSettingsPage_Form_Commands_Map } from "./Button";



export interface ISettingsPageProperties {

	// Required
	settingsProcessor: SettingsProcessor;
	bg: BackgroundClass;
	app: App;


	// Optional
}

export type TSettingsPagePropertiesState = {

	// Required
	connections: Array<IImmichConnection>,

	// Optional
}


export type TSettingsPagePropertiesMeta = {

	// Required
	app: App
	nextBg: BackgroundClass,
	bg: BackgroundClass,

	// Optional

}




export type ISetingsPagePropertiesController = IComponentProcessor<TSettingsPagePropertiesMeta, TSettingsPagePropertiesState, TSettingsPage_Form_Commands_Map>
