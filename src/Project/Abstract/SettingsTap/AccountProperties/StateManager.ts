import type { App } from "obsidian";
import type { IComponentProcessor } from "src/Base/Abstract/element/controller";
import type { TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { BackgroundClass } from "src/Base/Abstract/style/background";
import type { TAccount_Form_Layout, TAction_Form_Commands_Map } from "./Button";
import type { TBaseButton } from "src/Base/Abstract/element/trigger/IButton";


export type TAccountPropertiesState = {
	isEditing: boolean,
	isHidden: boolean,
	isApi: boolean,
	email: string | null,
	secret: string | null,
	formIcons: Array<TBaseButton>,
	account: TImmichAccount,
}


export type TAccountPropertiesMeta = {
	app?: App,
	originalAccount?: TImmichAccount,
	formMode: TAccount_Form_Layout
	bg: BackgroundClass,
	nextBg: BackgroundClass,
	displayAnimation: boolean,
	externalController: boolean,
}

export type IAccountPropertiesController = IComponentProcessor<TAccountPropertiesMeta, TAccountPropertiesState, TAction_Form_Commands_Map>
